import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDto, AuthSignUpDto, GetUserDto, SignInGoogleDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt-payload.interface';
import { Response } from 'express';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>,
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

        const salt = await bcrypt.genSalt(8)
        const newPassword = await bcrypt.hash(password, salt)
        const newUser = this.userRepository.create({ email, password: newPassword })

        try {
            await this.userRepository.save(newUser)
            const accessToken = this.generateAccessToken(newUser.id)
            const refreshToken = await this.generateRefreshToken(newUser.id)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 3600 * 24 * 7
            })
            return { user: newUser, accessToken }
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
            const newUser = await this.userRepository.create({
                email,
                password: null,
            })
            await this.userRepository.save(newUser)
            const refreshToken = await this.generateRefreshToken(newUser.id)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 3600 * 24 * 7,
                secure: true,
                sameSite:'none',
                path: '/'
            })
            res.redirect(process.env.CLIENT_URL!)

        }
    }

    async getUser(getUserDto: GetUserDto) {
        const { id } = getUserDto
        
        if(!id){
            throw new BadRequestException(['Chưa tồn tại người dùng'])
        }
        console.log('thisUser:',id)
        const user = await this.userRepository.findOne({ where: { id:id } })
        console.log('thisUser:',user)
        if (!user) {
            throw new BadRequestException(['Chưa tồn tại người dùng'])
        }
        
        return { user }
    }
    async handlerRefreshToken(id: string) {

        if (!id) {
            throw new BadRequestException(['Lỗi refresh token'])
        }
        console.log('ivx:',id)
        const userId = await this.userRepository.count({ where: { id:id } })
        if (!userId) {
            throw new BadRequestException(['Chưa tồn tại người dùng'])
        }
        const newAccessToken = await this.jwtService.sign({ id: id })
        console.log('rtn',newAccessToken)
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
}
