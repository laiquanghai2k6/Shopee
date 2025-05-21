import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PRODUCT_PER_PAGE } from 'src/admin/admin.service';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private productRepository:Repository<Products>
    ){

    }
    async getProduct(limit:number,page:number){
        try{
            const [data,total] = await this.productRepository.findAndCount({
                take:limit,
                skip:(page-1)*limit,
                order:{created_at:'desc'},
                relations:[]
            })
            return{product:data,page:page,total:total}
        }catch(e){
            console.log(e)
            throw new BadRequestException(['Lỗi hiển thị sản phẩm'])
        }
    }
      async getOneProduct(id:string){
        try{
            const data = await this.productRepository.findOne({
                where:{id}
            })
            if(!data) throw new NotFoundException(['Không thấy sản phẩm'])
            return data
        }catch(e){
            console.log(e)
            throw new BadRequestException(['Lỗi hiện sản phẩm'])
        }
    }
}
