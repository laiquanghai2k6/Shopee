import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { BannerDto, CreateCategoryDto, CreateVouncherDto, ProductDto, UpdateProductDto, UpdateUserDto, VouncherDto } from './admin.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Category } from 'src/entities/category.entity';
import { Banner } from 'src/entities/banner.entity';
import { Vouncher } from 'src/entities/vouncher.entity';
import { User } from 'src/entities/user.entity';
import { HistoryCart } from 'src/entities/history_cart.entity';
export const PRODUCT_PER_PAGE = 30
export const removeVietnameseTones=(str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9 ]/g, '') 
    .toLowerCase();
}

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Banner)
        private bannerRepository: Repository<Banner>,
        @InjectRepository(Vouncher)
        private vouncherRepository: Repository<Vouncher>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(HistoryCart)
        private historyCartRepo:Repository<HistoryCart>
    ) {

    }
    async createProduct(productDto: ProductDto) {
        try {

            const newProduct = await this.productRepository.create(productDto)
            newProduct.titleSearch = removeVietnameseTones(newProduct.title)
            const savedProduct = await this.productRepository.save(newProduct); 
            return savedProduct;
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi tạo hàng'])
        }
    }
    async changeProduct(id: string, updateProduct: UpdateProductDto) {
        try {
            const currentProduct = await this.productRepository.findOne({
                where: { id },
                relations: ['detail', 'productOptions', 'productOptions.options']
            })
            if (!currentProduct) throw new NotFoundException(['Không tìm thấy sản phẩm']);
            Object.assign(currentProduct, updateProduct)
            await this.productRepository.save(currentProduct)
            return { message: 'Cập nhật thành công' }
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi thay đổi hàng'])
        }
    }
    async createCategory(createCateory: CreateCategoryDto) {
        try {
            const newCategory = await this.categoryRepository.create(createCateory)
            const saveCategory = await this.categoryRepository.save(newCategory)
            return saveCategory
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi tạo thể loại'])
        }
    }
    async changeCategory(id: string, updateCategory: CreateCategoryDto) {
        try {
            const update = await this.categoryRepository.findOne({ where: { id } })
            if (!update) {
                throw new NotFoundException(['Không tìm thấy thể loại']);
            }
            Object.assign(update, updateCategory)
            const rtn = await this.categoryRepository.save(update)
            return rtn
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi thay đổi thể loại'])
        }
    }
    async changeBanner(bannerDto: BannerDto) {
        try {
            await this.bannerRepository.update(bannerDto.id, bannerDto)

            return { message: 'success' }
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi thay đổi banner'])
        }
    }
    async createBanner() {
        try {
            const banner = {
                bgLogin: '',
                bgNavigate: ['hi'],
                bg1: '',
                bg2: ''
            }
            const newBanner = await this.bannerRepository.create(banner)
            await this.bannerRepository.save(newBanner)

            return { message: 'success' }
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi thay đổi banner'])
        }
    }
    async getBanner() {
        try {
            const banner = await this.bannerRepository.find()
            return banner[0]
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi thay đổi banner'])
        }
    }
    async deleteVouncher(id: string) {
        try {
            const vouncher = await this.vouncherRepository.delete(id)
            if (vouncher.affected === 0) {
                throw new NotFoundException(`Vouncher không tồn tại`);
            }
            return { message: 'Xoá thành công' };
        } catch (e) {
            console.log(e)

            throw new BadRequestException(['Lỗi xóa vouncher'])
        }
    }
    async changeVouncher(vouncherDto: VouncherDto) {
        try {
            await this.vouncherRepository.update(vouncherDto.id, vouncherDto)
            return { message: 'success' }
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi thay đổi vouncher'])
        }
    }
    async createVouncher(createVouncherDto: CreateVouncherDto) {
        try {
            console.log('dto:', createVouncherDto)
            const newVouncher = await this.vouncherRepository.create(createVouncherDto)
            const newSave = await this.vouncherRepository.save(newVouncher)
            return newSave
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi tạo vouncher'])
        }
    }
    async getUser() {
        try {
            
            const users = await this.userRepository.find({
                select:['email','role','id']
            })
            return users
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi tìm người dùng'])
        }
    }
    async changeUser(id:string,updateUserDto:UpdateUserDto){
    try {
        console.log('updateUserDto:',updateUserDto)
        await this.userRepository.update(id,{role:updateUserDto.role})
        return { message: 'success' }
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi cập nhật người dùng'])
        }
    }
    async searchUser(email:string){
    try {
        console.log(email)
        const users = await this.userRepository.createQueryBuilder('user')
        .where('user.email ILIKE :email',{email:`%${email}%`})
        .select(['user.id', 'user.email', 'user.role'])
        .getMany();
        return users
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi tìm kiếm người dùng'])
        }
    }
    async searchHistory(from:string,to:string){
        try {
          const fromDate = new Date(from)
          const toDate = new Date(to)
          const histories = await this.historyCartRepo.createQueryBuilder('hc')
          .where('hc.received_at BETWEEN :start AND :end',{start:fromDate,end:toDate})
          .leftJoinAndSelect('hc.userCart','userCart')
          .leftJoinAndSelect('userCart.product','product')
          .getMany()
          return histories
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi truy vấn lịch sử'])
        }
    }



}
