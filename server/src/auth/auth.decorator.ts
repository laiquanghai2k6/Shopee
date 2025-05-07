import { createParamDecorator, ExecutionContext, SetMetadata, UnauthorizedException } from "@nestjs/common";


export const GetUser = createParamDecorator((data:any,context:ExecutionContext)=>{
    const currentRequest = context.switchToHttp().getRequest()
    if (!currentRequest.user) {
        throw new UnauthorizedException('Bạn chưa đăng nhập');
    }
    return {id:currentRequest.user}
})
export const GetGoogleUser = createParamDecorator((data:any,context:ExecutionContext)=>{
  const currentRequest = context.switchToHttp().getRequest()
  if (!currentRequest.user) {
    throw new UnauthorizedException('Bạn chưa đăng nhập');
  
}
  return {email:currentRequest.user.emails[0].value}
})
export const PUBLIC_KEY = 'isPublic'
export const Public =()=> SetMetadata(PUBLIC_KEY,true)