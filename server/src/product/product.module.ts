import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';

@Module({
  controllers: [ProductController],
  imports:[
    TypeOrmModule.forFeature([Products]),
  ],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
