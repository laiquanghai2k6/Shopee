import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt.guard";
import { Observable } from "rxjs";
import { PUBLIC_KEY } from "../auth.decorator";


export class PublicGuard implements CanActivate{
    constructor(private reflect:Reflector,
        private jwtAuthGuard:JwtAuthGuard,){
        
    }
    async canActivate(context: ExecutionContext):Promise<boolean> {
        
        const isPublic = this.reflect?.get<boolean>(PUBLIC_KEY,context.getHandler())
        if(isPublic){
            return this.jwtAuthGuard.canActivate(context) as Promise<boolean>
        }else return true
    }
}