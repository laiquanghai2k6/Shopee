import { Injectable, Req } from '@nestjs/common';
import * as crypto from 'crypto';
import { Request } from 'express';
import * as qs from 'qs';
import { HashAlgorithm, ProductCode, VNPay, VnpCurrCode, VnpLocale } from 'vnpay';
@Injectable()
export class VnpayService {
    private vnpay: VNPay

    constructor(

    ) {
    this.vnpay = new VNPay({
        
      tmnCode: process.env.VNP_TMNCODE!,
      secureSecret: process.env.VNP_HASH_SECRET!,
      vnpayHost: process.env.VNP_URL!, 
      testMode: true,
      hashAlgorithm:HashAlgorithm.SHA512,
      enableLog: true
    });
  }
    createPaymentUrl(amount: number, orderId: string, @Req() req: Request,): string {
         const rawIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress;
    const clientIp =  '127.0.0.1' 
        console.log(3)
    // Chuẩn bị params theo docs vnpay lib
    const params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: process.env.VNP_TMNCODE!,
      vnp_Locale: VnpLocale.VN,
      vnp_CurrCode: VnpCurrCode.VND,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: ProductCode.Other,
      vnp_Amount: (amount * 100),
      vnp_ReturnUrl: process.env.VNP_RETURN_URL!,
      vnp_IpAddr: clientIp ?? '',
      vnp_CreateDate: this.formatDate(new Date()),
    };
    console.log(params)
    // Sử dụng lib vnpay để tạo URL với chữ ký
    const paymentUrl = this.vnpay.buildPaymentUrl(params);
    console.log('paymentUrl',paymentUrl)
    return paymentUrl;

    }
    private formatDate(date: Date): number {
        return Number(date.toISOString().replace(/[-:TZ]/g, '').slice(0, 14));
    }
}
