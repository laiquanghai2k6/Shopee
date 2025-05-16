import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {v2 as cloudinary} from 'cloudinary'
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
@Module({
  imports:[ConfigModule],
  providers: [
    CloudinaryService,
    {
    inject:[ConfigService],
    provide:'CLOUDINARY',
    useFactory:(configService:ConfigService)=>{
      cloudinary.config({
        cloud_name:configService.get('CLOUDINARY_NAME'),
        api_key:configService.get('CLOUDINARY_KEY'),
        api_secret:configService.get('CLOUDINARY_SECRET')
      })
      return cloudinary;
    }
  }],
  exports:['CLOUDINARY',CloudinaryService],
  controllers: [CloudinaryController]
})
export class CloudinaryModule {}
