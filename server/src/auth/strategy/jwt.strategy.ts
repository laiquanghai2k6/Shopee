import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "./jwt-payload.interface";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){
        super({
            secretOrKey:process.env.JWT_SECRET,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload:JwtPayload){
        console.log('payload:',payload)
        const {id} = payload
        console.log('in valuid',id)
        const userExist = await this.userRepository.count({where:{id}})
        if(!userExist){
            throw new UnauthorizedException(['Không tồn tại người dùng'])
        }
        return id
    }
}