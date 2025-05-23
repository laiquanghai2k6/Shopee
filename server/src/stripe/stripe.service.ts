// stripe.service.ts
import Stripe from 'stripe';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Order)
    private orderRepository:Repository<Order>
  ){
    this.stripe = new Stripe(process.env.STRIPE_SECRET!)

  }

  // async createCheckoutSession(amount: number) {
  //   const session = await this.stripe.checkout.sessions.create({
  //     payment_method_types: ['card'],
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: 'usd',
  //           product_data: {
  //             name: 'Đơn hàng Shopee Clone',
  //           },
  //           unit_amount: amount * 100, // cents
  //         },
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'payment',
  //     success_url: 'http://localhost:3000/payment-success',
  //     cancel_url: 'http://localhost:3000/payment-cancel',
  //   });

  //   return { url: session.url };
  // }
  async createOrder(amount: number) {
    const order = this.orderRepository.create({ amount });
    const orderSaved = await this.orderRepository.save(order);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Shopee Clone Order' },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?orderId=${orderSaved.id}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    orderSaved.stripeSessionId = session.id;
    await this.orderRepository.save(orderSaved);

    return { url: session.url ,orderId:orderSaved.id};
  }


  async handlerWebHook(sig: string,req: Request){
     const endpointSecret = 'whsec_...'; 
    let event: Stripe.Event;
    console.log('typeof req.body:', typeof req.body);
    console.log('is buffer:', Buffer.isBuffer(req.body));
    try {
        event = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log('⚠️ Webhook failed:', err.message);
        return;
    }
    console.log('inwwebhook')
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const order = await this.orderRepository.findOne({
            where: { stripeSessionId: session.id },
        });
        console.log('order:',order)
        if (order) {
            order.status = 'paid';
            console.log('PAID')
            await this.orderRepository.save(order);
        }
    }
  }
  async getOrder(id:string){
    const order = await this.orderRepository.findOneBy({ id });
        if (!order) throw new NotFoundException();

        return { status: order.status };
  }
}
