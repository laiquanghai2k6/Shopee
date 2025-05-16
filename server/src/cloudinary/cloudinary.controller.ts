
import { Body, Controller, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from 'src/auth/auth.dto';
import { FileLargeFilter } from 'src/auth/filter/FileLarge.filter';

@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly uploadService:CloudinaryService){

    }

   
}
