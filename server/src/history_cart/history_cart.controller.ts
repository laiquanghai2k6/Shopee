import { HistoryCartService } from './history_cart.service';
import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateUserCartDto, HistoryCartDto, UpdateHistoryCartDto } from './history_cart.dto';

@Controller('history-cart')
export class HistoryCartController {
    constructor(
        private readonly HistoryCartService:HistoryCartService
    ){

    }
    @UseGuards(JwtAuthGuard)
    @Post('create-history-cart')
    CreateHistoryCart(
        @Body() HistoryCartDto:HistoryCartDto
    ){
        return this.HistoryCartService.createHistoryCart(HistoryCartDto)
    }
    @UseGuards(JwtAuthGuard)
    @Get('get-user-cart')
    GetUserCart(@Query('id') id:string){
        return this.HistoryCartService.getUserCart(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post('create-user-cart')
    CreateUserCart(@Body() createUserCartDto:CreateUserCartDto){
        return this.HistoryCartService.createUserCart(createUserCartDto)
    }
    @UseGuards(JwtAuthGuard)
    @Delete('delete-user-cart')
    DeleteUserCart(@Query('id') id:string){
        return this.HistoryCartService.deleteUserCart(id)
    }
    @UseGuards(JwtAuthGuard)
    @Get('get-history')
    GetHistoryCart(@Query('id') id:string){
        return this.HistoryCartService.getHistoryCart(id)
    }
    @Patch('update-history')
    UpdateHistoryCart(@Body() historyDto:UpdateHistoryCartDto){
        return this.HistoryCartService.updateHistoryCart(historyDto)
    }
}
