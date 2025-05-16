import { Optional } from "@nestjs/common";
import { Allow, IsNotEmpty, IsOptional } from "class-validator";
import { Detail } from "src/entities/detail.entity";
import { ProductOptions } from "src/entities/product_options.entity";
import { Role } from "src/entities/user.entity";



export class ProductDto {
    @IsNotEmpty()
    type: string
    @IsNotEmpty()
    title: string
    @IsOptional()
    description: string
    @IsNotEmpty()
    remain: string
    @IsNotEmpty()
    timeDiscount: Date
    @IsNotEmpty()
    discount: string
    @IsNotEmpty()
    image: string
    @IsNotEmpty()
    created_at: Date
    @IsNotEmpty()
    price: string
    @IsOptional()
    detail?: Detail[]
    @IsOptional()
    productOptions?: ProductOptions[]
}
export class UpdateProductDto {
    @IsOptional()
    type: string
    @IsOptional()
    title: string
    @IsOptional()
    description: string
    @IsOptional()

    remain: string
    @IsOptional()

    timeDiscount: Date
    @IsOptional()

    discount: string
    @IsOptional()

    image: string
    @IsOptional()

    created_at: Date
    @IsOptional()

    price: string
    @IsOptional()
    detail?: Detail[]
    @IsOptional()
    productOptions?: ProductOptions[]
}
export class CreateCategoryDto {
    @IsOptional()
    name: string
    @IsOptional()
    image: string
}
export type PartialType<T> = {
    [P in keyof T]?: T[P]
}

export class BannerDto {
    @Allow()
    @IsNotEmpty()
    id: string
    @Optional()
    @Allow()

    bgLogin?: string
    @Optional()
    @Allow()

    bgNavigate?: string[]
    @Optional()
    @Allow()

    bg1?: string
    @Optional()
    @Allow()
    bg2?: string
}
export class VouncherDto {
    @IsNotEmpty()
    id: string
    @Optional()
    @Allow()
    discount?: string
    @Optional()
    @Allow()
    expire?: string
    @Optional()
    @Allow()
    maxDiscount?: string
}
export class CreateVouncherDto {

    @IsNotEmpty()
    discount: string
    @IsNotEmpty()
    expire: Date
    @IsNotEmpty()
    maxDiscount: string
}

export class UpdateUserDto{
    @IsNotEmpty()
    role:Role
}

