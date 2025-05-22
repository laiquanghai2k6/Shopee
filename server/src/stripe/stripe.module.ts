import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeController } from './stripe.controller';
import { Order } from 'src/entities/order.entity';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [StripeController],
    imports: [
        TypeOrmModule.forFeature([Order])
    ],
    providers: [StripeService,ConfigModule],
    exports: [StripeService]

})
export class StripeModule {


}
