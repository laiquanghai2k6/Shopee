import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  controllers: [ProductController],
  imports:[
    TypeOrmModule.forFeature([Products,Category]),
  ],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
