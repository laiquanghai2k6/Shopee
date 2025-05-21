import { UploadedFile } from "@nestjs/common";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class AuthSignUpDto {
    @IsNotEmpty({ message: 'Email không được để trống' })
    @MinLength(3, { message: 'Email tối thiểu 3 kí tự' })
    @MaxLength(64, { message: 'Email tối đa 64 kí tự' })
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(8, { message: 'Mật khẩu tối thiểu 8 kí tự' })
    @MaxLength(32, { message: 'Mật khẩu tối đa 32 kí tự' })
    password: string
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(8, { message: 'Mật khẩu tối thiểu 8 kí tự' })
    @MaxLength(32, { message: 'Mật khẩu tối đa 32 kí tự' })
    confirmPassword: string
}

export class AuthSignInDto {
    @IsNotEmpty({ message: 'Email không được để trống' })
    @MinLength(3, { message: 'Email tối thiểu 3 kí tự' })
    @MaxLength(64, { message: 'Email tối đa 64 kí tự' })
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(8, { message: 'Mật khẩu tối thiểu 8 kí tự' })
    @MaxLength(32, { message: 'Mật khẩu tối đa 32 kí tự' })
    password: string
}

export class GetUserDto {
    @IsNotEmpty({ message: 'Không thấy người dùng' })
    id: string

}
export class SignInGoogleDto {
    @IsNotEmpty({ message: 'Lỗi không có email' })
    email: string
}
export class UploadImageDto {
    @IsNotEmpty({ message: 'Lỗi thiếu folder ảnh' })
    folder: string
}
export class SaveVouncherDto {
    @IsNotEmpty({ message: 'Lỗi thiếu id' })
    userId: string
    @IsNotEmpty({ message: 'Lỗi thiếu id' })
    vouncherId: string
}
export class UpdateVouncherDto{
    @IsNotEmpty({ message: 'Lỗi thiếu id' })
    userVouncherId:string
}
export class GetMyVouncherDto{
    @IsNotEmpty({ message: 'Lỗi thiếu id' })
    userId:string
}