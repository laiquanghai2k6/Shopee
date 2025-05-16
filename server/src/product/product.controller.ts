import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){

    }
       @Get('get-product')
   
    GetProduct(@Query('page') page:number,@Query('limit') limit:number){
        return this.productService.getProduct(limit,page)
    }
}
