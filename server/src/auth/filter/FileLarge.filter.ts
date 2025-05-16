import { ArgumentsHost, Catch, ExceptionFilter, HttpException, PayloadTooLargeException } from "@nestjs/common";
import { Response } from "express";




@Catch(PayloadTooLargeException)
export class FileLargeFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        throw new HttpException({
            statusCode: 413,
            message: ['Ảnh không được vượt quá 1MB'],
            error: 'Dung lượng file quá lớn',
        }, 413);
    }
}