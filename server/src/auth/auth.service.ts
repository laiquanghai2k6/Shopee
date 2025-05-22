import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDto, AuthSignUpDto, GetMyVouncherDto, GetUserDto, IncDto, SaveVouncherDto, SignInGoogleDto, UpdateVouncherDto, UploadImageDto, UserImageDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt-payload.interface';
import { Response } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Vouncher } from 'src/entities/vouncher.entity';
import { StateVouncher, UserVouncher } from 'src/entities/user_vouncher';
import { History } from 'src/entities/history.entity';
@Injectable()
export class AuthService {
    constructor(@
        InjectRepository(User)
    private userRepository: Repository<User>,
        @InjectRepository(Vouncher)
        private vouncherRepo: Repository<Vouncher>,
        @InjectRepository(UserVouncher)
        private userVouncherRepo:Repository<UserVouncher>,
        @InjectRepository(History)
        private historyRepo:Repository<History>,
        private cloudinaryService: CloudinaryService,
        private jwtService: JwtService
    ) {


    }
    generateAccessToken(id: string) {
        return this.jwtService.sign({ id })
    }
    async generateRefreshToken(id: string) {
        return await this.jwtService.signAsync({ id }, {
            expiresIn: '7d',
            secret: process.env.REFRESH_SECRET
        })
    }
    async SignUp(authSignUpDto: AuthSignUpDto, res: Response) {
        const { confirmPassword, email, password } = authSignUpDto
        if (confirmPassword != password) {
            throw new BadRequestException(['Xác nhận mật khẩu không khớp'])
        }

        try {
            const salt = await bcrypt.genSalt(8)
            const newPassword = await bcrypt.hash(password, salt)
            const history = await this.historyRepo.create();
            const newUser = await this.userRepository.create({ email, password: newPassword,history:history })
            const savedUser = await this.userRepository.save(newUser)
             await this.historyRepo.save(history);
            const accessToken = this.generateAccessToken(newUser.id)
            const refreshToken = await this.generateRefreshToken(newUser.id)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 3600 * 24 * 7
            })
            return { user: savedUser, accessToken }
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(['Email đã tồn tại']);
            }
            throw e
        }
    }
    async signIn(authSignInDto: AuthSignInDto, res: Response) {
        const { email, password } = authSignInDto

        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) {
            throw new BadRequestException(['Chưa tồn tại người dùng'])
        }
        const payload: JwtPayload = { id: user.id }
        const accessToken = this.jwtService.sign(payload)
        const check = await bcrypt.compare(password, user.password)
        if (!check) throw new UnauthorizedException(['Mật khẩu không đúng'])
        const refreshToken = await this.generateRefreshToken(user.id)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 3600 * 24 * 7
        })
        return { user: user, accessToken }
    }
    async signInGoogle(signInGoogleDto: SignInGoogleDto, res: Response) {
        const { email } = signInGoogleDto
        const user = await this.userRepository.findOne({ where: { email } })
        if (user) {
            const refreshToken = await this.generateRefreshToken(user.id)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 3600 * 24 * 7
            })
            res.redirect(process.env.CLIENT_URL!)

        } else {
            const history = await this.historyRepo.create();

            const newUser = await this.userRepository.create({
                email,
                password: null,
                history:history
            })
            await this.userRepository.save(newUser)
            const refreshToken = await this.generateRefreshToken(newUser.id)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 3600 * 24 * 7,
                secure: true,
                sameSite: 'none',
                path: '/'
            })
            res.redirect(process.env.CLIENT_URL!)

        }
    }

    async getUser(getUserDto: GetUserDto) {
        console.log('getUserD:', getUserDto)
        const { id } = getUserDto
        console.log('id:', id)
        if (!id) {
            throw new BadRequestException(['Chưa tồn tại người dùng'])
        }
        console.log('thisUser:', id)
        const user = await this.userRepository.findOne({ where: { id: id } })
        console.log('thisUser:', user)
        if (!user) {
            throw new BadRequestException(['Chưa tồn tại người dùng'])
        }

        return { user }
    }
    async handlerRefreshToken(id: string) {

        if (!id) {
            throw new BadRequestException(['Lỗi refresh token'])
        }
        const userId = await this.userRepository.count({ where: { id: id } })
        if (!userId) {
            throw new BadRequestException(['Chưa tồn tại người dùng'])
        }
        const newAccessToken = await this.jwtService.sign({ id: id })
        console.log('rtn', newAccessToken)
        return newAccessToken
    }
    async signOut(res: Response) {
        console.log('signing out')
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        console.log('fn')
        return 'ádsad'
    }
    async signOutAuto(res: Response) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        return { message: 'sign out success' }

    }
    async uploadUserImage(file: Express.Multer.File, uploadImageDto: UploadImageDto) {
        const { folder } = uploadImageDto
        try {

            if (file) {
                const imgUrl = await this.cloudinaryService.uploadImage(file, folder)

                return imgUrl
            } else throw new BadRequestException(['Không tồn tại file'])
        } catch (e) {
            throw new BadRequestException(['Lỗi tải ảnh'])
        }
    }
    async userImage(userImageDto:UserImageDto){
        const {id,url} = userImageDto
        try {
            const user = await this.userRepository.findOne({where:{id}})
            if(!user) throw new NotFoundException(['Không thấy user'])
            user.image = url
            await this.userRepository.save(user)
            return user
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi tải ảnh user'])

        }
    }
    async addVouncher(saveVouncherDto: SaveVouncherDto) {
        const { userId, vouncherId } = saveVouncherDto
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } })
            const vouncher = await this.vouncherRepo.findOne({ where: { id: vouncherId } })
            if (!user) throw new BadRequestException(['Không thấy người dùng'])
            if (!vouncher) throw new BadRequestException(['Không thấy vouncher'])
            const newUserVouncher = await this.userVouncherRepo.create({
                user,
                vouncher
            })
            await this.userVouncherRepo.save(newUserVouncher)
            return newUserVouncher
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi lưu vouncher'])
        }
    }
    async deleteVouncher(saveVouncherDto: UpdateVouncherDto) {
        const { userVouncherId } = saveVouncherDto

        try {
            await this.userVouncherRepo.update({id:userVouncherId},{state:StateVouncher.USED})
            
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi xóa vouncher'])
        }
    }
    async getMyVouncher(id:string){


        try {
            const vounchers = this.userVouncherRepo.createQueryBuilder('uv')
            .leftJoinAndSelect('uv.vouncher','vouncher')
            .leftJoin('uv.user','user')
            .addSelect(['user.id'])
            .where('uv.user.id = :id',{id})
            .getMany()      
            return vounchers      
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi lấy vouncher'])
        }
    }
    async increaseMoney(IncDto:IncDto){
        const {id,amount} = IncDto
        try {
            const user = await this.userRepository.findOne({where:{id}})
            if(!user) throw new NotFoundException(['Không thấy user'])
            user.money += amount
            await this.userRepository.save(user)
            return user

        } catch (error) {
            console.log(error)
             throw new BadRequestException(['Lỗi tăng tiền'])
        }
    }
    async decreaseMoney(IncDto:IncDto){
        const {id,amount} = IncDto
        try {
            const user = await this.userRepository.findOne({where:{id}})
            if(!user) throw new NotFoundException(['Không thấy user'])
            user.money -= amount
            await this.userRepository.save(user)
            return user
        } catch (error) {
            console.log(error)
             throw new BadRequestException(['Lỗi tăng tiền'])
        }
    }
}
