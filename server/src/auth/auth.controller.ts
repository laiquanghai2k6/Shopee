import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto, GetUserDto, SignInGoogleDto } from './auth.dto';
import { GetGoogleUser, GetUser, Public } from './auth.decorator';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt.guard';
import { Response } from 'express';
import { RefreshStrategy } from './strategy/refresh.strategy';
import { GoogleGuard } from './guard/google.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }
    @Post('/sign-up')
    @Public()
    SignUp(@Body() authSignUpDto: AuthSignUpDto,@Res({passthrough:true}) res:Response) {
        return this.authService.SignUp(authSignUpDto,res)
    }
    @Post('/sign-in')
    @Public()
    SignIn(@Body() authSignInDto: AuthSignInDto,@Res({passthrough:true}) res:Response) {
        return this.authService.signIn(authSignInDto,res)
    }
    
    @Get('google')
    @UseGuards(GoogleGuard)
    @Public()
    GoogleLogin(){

    }
    @Get('google/callback')
    @UseGuards(GoogleGuard)
    @Public()
    GoogleCallback(@Res({passthrough:true}) res:Response,@GetGoogleUser() googleUserDto:SignInGoogleDto){
        console.log('userdto',googleUserDto)

        return this.authService.signInGoogle(googleUserDto,res)
         
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getUser')
    GetUserInfo(@GetUser() getUserDto: GetUserDto) {
        console.log('getUserDto',getUserDto)
        return this.authService.getUser(getUserDto);
    }
    @UseGuards(AuthGuard('refresh'))
    @Get('/refreshToken')
    HandlerRefreshToken(@GetUser() user){
        console.log('handler',user)
        return this.authService.handlerRefreshToken(user.id)
    }
    @UseGuards(JwtAuthGuard)
    @Get('/sign-out')
    SignOut(@Res({passthrough:true}) res:Response){
        return this.authService.signOut(res)
    }

    @Get('/sign-out-auto')
    SignOutAuto(@Res({passthrough:true}) res:Response){
        return this.authService.signOutAuto(res)
    }



}
