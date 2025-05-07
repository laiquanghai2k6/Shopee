import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            secretOrKey: process.env.REFRESH_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    const token = req.cookies?.refreshToken;
                    console.log('refreshToken raw:', token, 'typeof:', typeof token); // 👈 kiểm tra kỹ
                    return token;
                }
            ]),
            passReqToCallback: true
        })
    }
    async validate(req: Request, payload) {
        const { id } = payload
        
      
        const userExist = await this.userRepository.count({ where: { id } })
        
        if (!userExist) {
            throw new UnauthorizedException('Không tồn tại người dùng')
        }
        
        return id
    }
}