import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PRODUCT_PER_PAGE, removeVietnameseTones } from 'src/admin/admin.service';
import { Category } from 'src/entities/category.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(Category)
        private cateRepository: Repository<Category>
    ) {

    }
    async getProduct(limit: number, page: number) {
        try {
            const [data, total] = await this.productRepository.findAndCount({
                take: limit,
                skip: (page - 1) * limit,
                order: { created_at: 'desc' },
                relations: []
            })
            return { product: data, total: total }
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi hiển thị sản phẩm'])
        }
    }
    async getProductCategory(id: string) {
        try {
            const category = await this.cateRepository.findOne({ where: { id } })
            if (!category)
                throw new NotFoundException(['Lỗi không thấy thể loại'])

            const data = await this.productRepository.find({
                where: { type: category.name },
                order: { created_at: 'desc' },

            })
            return { product: data, total: 0 }
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi hiển thị sản phẩm'])
        }
    }
    async getOneProduct(id: string) {
        try {
            const data = await this.productRepository.findOne({
                where: { id }
            })
            if (!data) throw new NotFoundException(['Không thấy sản phẩm'])
            return data
        } catch (e) {
            console.log(e)
            throw new BadRequestException(['Lỗi hiện sản phẩm'])
        }
    }
    async getFlashSale() {
        try {

            const data = await this.productRepository.createQueryBuilder('product')
                .where('product.timeDiscount > :time', { time: new Date() })
                .andWhere('product.discount != :discount', { discount: 0 })
                .getMany()
            return data
        } catch (error) {
            throw new NotFoundException(['Không thấy sản phẩm'])
        }
    }
    async searchProductInput(title: string) {
        try {
            const titleFormat = title
                .replace(/\s+/g, ' ')
                .split(' ')
                .map((t) => `${t.trim()}:*`)
                .join(' | ');
            console.log('titleFormat', titleFormat)
            const products = await this.productRepository.createQueryBuilder('product')
                .where(`product.title_vector @@ to_tsquery('simple',:query)`, { query: titleFormat })
                .select(['product.title','product.id'])
                .limit(7)
                .getMany()
            return products
        } catch (e) {
            throw new NotFoundException(['Không thấy sản phẩm'])

        }
    }
    async searchProduct(title:string){
        try {
            const titleFormat = title
                .replace(/\s+/g, ' ')
                .split(' ')
                .map((t) => `${t.trim()}:*`)
                .join(' | ');
            console.log('titleFormat', titleFormat)
            const products = await this.productRepository.createQueryBuilder('product')
                .where(`product.title_vector @@ to_tsquery('simple',:query)`, { query: titleFormat })
                .getMany()
            return products
        } catch (e) {
            throw new NotFoundException(['Không thấy sản phẩm'])

        }
    }
}
