import { Controller, Post, Body, Headers, Req, Param, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) { }

    // @Post('create-checkout-session')
    // createSession(@Body('amount') amount: number) {
    //     return this.stripeService.createCheckoutSession(amount);
    // }
    @Post('create-order')
    CreateOrder(@Body('amount') amount: number) {
        return this.stripeService.createOrder(amount)
    }

    @Post('webhook')
    HandleWebhook(
        @Headers('stripe-signature') sig: string,
        @Req() req: Request,
    ) {
        return this.stripeService.handlerWebHook(sig, req)
    }
    @Get('/order/:id')
    GetStatus(@Param('id') id: string) {
        return this.stripeService.getOrder(id)
    }
}



