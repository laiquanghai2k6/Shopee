import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/auth.decorator';
import { Role } from 'src/entities/user.entity';

@Controller('category')

export class CategoryController {
    constructor(private categoryService:CategoryService){

    }
    
    @Get('get-category')
    GetCategory(){
        return this.categoryService.getCategory()
    }
}
