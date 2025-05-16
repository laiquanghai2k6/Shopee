import { Inject, Injectable, UploadedFile } from "@nestjs/common";
import { v2 as Cloudinary } from 'cloudinary';
import { Express } from 'express';

@Injectable()
export class CloudinaryService{
    constructor(@Inject('CLOUDINARY') private cloudinary:typeof Cloudinary){

    }
    async uploadImage(file:Express.Multer.File,folder:string):Promise<string>{
        return new Promise((resolve,reject)=>{
            this.cloudinary.uploader.upload_stream(
                {folder:folder ?? 'uploads'},
                (error,result)=>{
                    if(error) return reject(error)
                        return resolve(result?.secure_url ?? '')
                }
            ).end(file.buffer)
        })
    }
}