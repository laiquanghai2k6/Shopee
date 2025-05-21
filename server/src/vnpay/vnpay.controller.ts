import { Controller, Get, Query, Req } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import * as QRCode from 'qrcode';
@Controller('vnpay')
export class VnpayController {
    constructor(private readonly vnpayService: VnpayService) { }
    @Get('create-payment')
    async createPayment(@Query('amount') amount: string, @Query('orderId') orderId: string, @Req() req) {
        
        const url = this.vnpayService.createPaymentUrl(Number(amount), orderId, req);
        const qr = await QRCode.toDataURL(url); // Trả về base64 QR image

        return {
            paymentUrl: url,
            qrCode: qr, // dùng <img src="..."> để hiển thị QR
        };
    }
}
