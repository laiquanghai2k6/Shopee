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
        const {id} = payload
         console.log('in acpt1')
        const userExist = await this.userRepository.findOne({where:{id}})
        if(!userExist){
            throw new UnauthorizedException(['Không tồn tại người dùng'])
        }
        console.log('in acpt2')
        return {id:id,role:userExist.role}
    }
}