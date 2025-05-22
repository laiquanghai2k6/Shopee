import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){

    }
       @Get('/get-product')
   
    GetProduct(@Query('page') page:number,@Query('limit') limit:number){
        return this.productService.getProduct(limit,page)
    }
    @Get('/get-one-product/:id')
    GetOneProduct(@Param('id') id:string){
        return this.productService.getOneProduct(id)
    }
    @Get('/get-product-category')
    GetProductCategory(@Query('id') id:string){
        return this.productService.getProductCategory(id)
    }
    @Get('get-flash-sale')
    GetFlashSale(){
        return this.productService.getFlashSale()
    }
    @Get('/search-product-input')
    SearchProductInput(@Query('title') title:string){
        return this.productService.searchProductInput(title)
    }
    @Get('/search-product')
    SearchProduct(@Query('title') title:string){
        return this.productService.searchProduct(title)
    }
}
