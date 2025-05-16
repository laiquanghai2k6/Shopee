import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CategoryController } from './category.controller';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CategoryService],
  controllers:[CategoryController],
  imports:[

    TypeOrmModule.forFeature([Category])
  ],
  exports:[CategoryService]
})
export class CategoryModule {



}
