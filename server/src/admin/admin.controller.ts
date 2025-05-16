import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/entities/user.entity';
import { Roles } from 'src/auth/auth.decorator';
import { BannerDto, CreateCategoryDto, CreateVouncherDto, ProductDto, UpdateProductDto, UpdateUserDto, VouncherDto } from './admin.dto';

@Controller('admin')

export class AdminController {
    constructor(private adminService:AdminService){}
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.admin)
    @Post('/create-product')
    CreateProduct(@Body() productDto:ProductDto){
        return this.adminService.createProduct(productDto)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Patch('/change-product/:id')
    @Roles(Role.admin)
    UpdateProduct(
        @Param('id') id: string,
        @Body()updateProduct:UpdateProductDto){
            return this.adminService.changeProduct(id,updateProduct)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post('/create-category')
    @Roles(Role.admin)
    CreateCategory(
        @Body() createCatory:CreateCategoryDto
    ){
        return this.adminService.createCategory(createCatory)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Patch('/update-category/:id')
    @Roles(Role.admin)
    UpdateCategory(
        @Param('id') id:string,
        @Body() updateCategory:CreateCategoryDto
    ){
        return this.adminService.changeCategory(id,updateCategory)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Patch('/update-banner')
    @Roles(Role.admin)
    UpdateBanner(
        
        @Body() updateBanner:BannerDto
    ){
        return this.adminService.changeBanner(updateBanner)
    }

    @Get('/get-banner')
    GetBanner(){
        return this.adminService.getBanner()
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.admin)
    @Delete('/delete-vouncher/:id')
    DeleteVouncher(@Param('id') id:string){
        return this.adminService.deleteVouncher(id)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.admin)
    @Patch('/update-vouncher')
    UpdateVouncher(@Body() vouncherDto:VouncherDto){
        return this.adminService.changeVouncher(vouncherDto)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.admin)
    @Post('/create-vouncher')
    CreateVouncer(@Body() createVouncherDto:CreateVouncherDto){
        return this.adminService.createVouncher(createVouncherDto)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.admin)
    @Get('/get-user')
    GetUser(){
        return this.adminService.getUser()
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.admin)
    @Patch('/update-user/:id')
    UpdateUser(
        @Param('id') id:string,
        @Body() updateUserDto:UpdateUserDto
    ){
        return this.adminService.changeUser(id,updateUserDto)
    }
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.admin)
    @Get('/search-user/:email')
    GetSearchUser(
        @Param('email') email:string
    ){
        return this.adminService.searchUser(email)
    }

}
