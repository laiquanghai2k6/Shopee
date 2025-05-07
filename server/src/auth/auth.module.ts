import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshStrategy } from './strategy/refresh.strategy';
import googleOauthConfig from './config/google-oauth.config';
import { JwtAuthGuard } from './guard/jwt.guard';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  providers: [AuthService,JwtStrategy,RefreshStrategy,JwtAuthGuard,GoogleStrategy],
  controllers:[AuthController],
  imports: [TypeOrmModule.forFeature([User]),
  ConfigModule.forFeature(googleOauthConfig),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    inject:[ConfigService],
    imports:[ConfigModule],
    useFactory:async (configService:ConfigService)=>{
      console.log(process.env.REFRESH_SECRET);
      return{
        secret:configService.get('JWT_SECRET'),
        signOptions:{
          expiresIn:3600
        }
      }
    }
  }),
  
],
  exports:[AuthService,PassportModule,JwtModule]
})
export class AuthModule {}
