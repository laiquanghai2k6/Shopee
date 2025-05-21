import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { History } from "src/entities/history.entity";
import { StateHistory } from "src/entities/history_cart.entity";
import { Products } from "src/entities/products.entity";
import { UserCart, UserCartType } from "src/entities/user_cart.entity";

export enum MethodHistory{
    COD='Thanh toán khi nhận hàng',
    WALLET='Thanh toán bằng ví'
}


export class HistoryCartDto {
    @IsNotEmpty()
    historyId: string
    @IsNotEmpty()
    state: StateHistory
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    userCart: UserCart[]
    @IsNotEmpty()
    phone: string
    @IsNotEmpty()
    total: string
    @IsNotEmpty()
    method:MethodHistory
    @IsNotEmpty()
    create_at:Date
}
export class CreateUserCartDto {
    @IsNotEmpty()
    userId: string
    @IsNotEmpty()
    product: Products
    @IsNotEmpty()
    quantity: number
    @IsOptional()
    choosedOption?: string
    @IsNotEmpty()
    priceProduct: string
    @IsNotEmpty()
    priceDiscount: string
    @IsNotEmpty()
    type: UserCartType

}
export class UpdateHistoryCartDto {
    @IsNotEmpty()
    historyId:string
    @IsNotEmpty()
    received_at:Date
}