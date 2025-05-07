import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class RefreshTokenMiddlewares implements NestMiddleware{
    constructor(private readonly jwtService:JwtService,
                private authService:AuthService

    ){}
    use(req: Request, res: Response, next: (error?: any) => void) {
        const refreshToken = req.cookies['refreshToken']
        if(refreshToken && this.jwtService.verify(refreshToken,{
            secret:process.env.REFRESH_SECRET
        })){
          throw new UnauthorizedException('Bạn không có quyền đăng xuất');  
        }
    next()
        
    }
}