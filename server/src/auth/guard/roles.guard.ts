import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/entities/user.entity";
import { ROLES_KEY } from "../auth.decorator";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const isRequire = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        
        if(!isRequire) return true
        const { user} = context.switchToHttp().getRequest()
        console.log(isRequire.includes(user?.role))
        return isRequire.includes(user?.role)
    }
}