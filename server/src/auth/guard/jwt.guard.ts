import { ExecutionContext, Injectable, UnauthorizedException, Logger, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
 
  
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    
    if (info?.message === 'No auth token' ||info?.message === 'jwt expired') {
      throw new HttpException(
        {
            message: 'Không có token hoặc hết hạn',
   
        },
        401, 
    );
    }

    console.log('hẻe')
    return user;
  }
}