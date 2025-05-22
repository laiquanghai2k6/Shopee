import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryCart, StateHistory } from 'src/entities/history_cart.entity';
import { Repository } from 'typeorm';
import { CreateUserCartDto, HistoryCartDto, UpdateHistoryCartDto } from './history_cart.dto';
import { History } from 'src/entities/history.entity';
import { UserCart, UserCartType } from 'src/entities/user_cart.entity';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class HistoryCartService {
    constructor(
        @InjectRepository(HistoryCart)
        private historyCartRepo: Repository<HistoryCart>,
        @InjectRepository(UserCart)
        private userCartRepo: Repository<UserCart>,
        @InjectRepository(History)
        private historyRepo: Repository<History>,
        @InjectRepository(Products)
        private productrepo: Repository<Products>
    ) {

    }
    async createHistoryCart(HistoryCartDto: HistoryCartDto) {
        try {

            const history = await this.historyRepo.count({ where: { id: HistoryCartDto.historyId } })
            if (!history)
                throw new NotFoundException(['Lỗi không thấy lịch sử'])
            console.log('HistoryCartDto:', HistoryCartDto)
            if (!HistoryCartDto.userCart[0].id) {

                const userCart = await this.userCartRepo.create({ ...HistoryCartDto.userCart[0], type: UserCartType.FINISH })

                const newUserCart = await this.userCartRepo.save(userCart)
                HistoryCartDto.userCart[0] = newUserCart
                console.log('im here')
            }
            const userCartPromises = HistoryCartDto.userCart.map(async (cart) => {

                await this.userCartRepo.update(cart.id, {
                    type: UserCartType.FINISH,
                });

                return await this.userCartRepo.findOneBy({ id: cart.id });
            });

            const updatedUserCartsWithNulls = await Promise.all(userCartPromises);

            const updatedUserCarts = updatedUserCartsWithNulls.filter(
                (cart): cart is UserCart => cart !== null
            );
            HistoryCartDto.userCart = updatedUserCarts;
            const historyCart = await this.historyCartRepo.create(HistoryCartDto)

            const newHistoryCart = await this.historyCartRepo.save(historyCart)
            const fullHistoryCart = await this.historyCartRepo.findOne({
                where: { id: newHistoryCart.id },
                relations: ['userCart', 'userCart.product'], 
            });
            return fullHistoryCart
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi tạo đơn hàng'])
        }
    }
    async getUserCart(id: string) {
        try {

            const userCart = await this.userCartRepo.find({
                where: { userId: id, type: UserCartType.PENDING },
                relations: ['product']
            })
            return userCart
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi lấy giỏ hàng'])
        }
    }
    async createUserCart(userCartDto: CreateUserCartDto) {
        try {

            const userCart = await this.userCartRepo.create(userCartDto)
            const newUserCart = await this.userCartRepo.save(userCart)
            return newUserCart
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi tạo đơn hàng'])
        }
    }
    async deleteUserCart(id: string) {
        try {

            await this.userCartRepo.delete({ id: id })
            return { message: 'sucess' }
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi xóa đơn hàng'])
        }
    }
    async getHistoryCart(historyId: string) {
        try {
            const historyCart = this.historyCartRepo.find({
                where: {
                    historyId: historyId
                },
                relations: ['userCart', 'userCart.product'],
                order: {
                    create_at: 'desc'
                }
            })
            return historyCart
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi Lấy lịch sử'])
        }
    }
    async updateHistoryCart(historyDto: UpdateHistoryCartDto) {
        const { historyId, received_at } = historyDto
        try {
            await this.historyCartRepo.update(historyId, {
                state: StateHistory.RECEIVED,
                received_at: received_at,
            })
            const history = await this.historyCartRepo.findOne({
                where: { id: historyId },
                relations: ['userCart', 'userCart.product'],
            });
            if (!history) {
                throw new BadRequestException('Không tìm thấy đơn hàng');
            }
            for (const item of history.userCart) {
                const product = await this.productrepo.findOne({
                    where: { id: item.product.id },
                });
                if (!product) continue;
                const remain = parseInt(product.remain || '0');
                const newRemain = remain - item.quantity;
                const newSold = product.sold + item.quantity
                product.remain = String(newRemain.toString())
                product.sold = newSold
                await this.productrepo.save(product)
            }
            return { message: 'success' }
        } catch (error) {
            console.log(error)
            throw new BadRequestException(['Lỗi cập nhật lịch sử'])
        }
    }
}
