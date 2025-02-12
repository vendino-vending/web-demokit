import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false
})
export class PaymentPage {
  paymentMethods = [
    { name: 'GrabPay', image: 'assets/img/grab_pay.png', qr: 'assets/img/qr_code_sample.png' },
    { name: 'ShopeePay', image: 'assets/img/shopee_pay.png', qr: 'assets/img/fail_icon.png' },
    { name: 'TouchNGo', image: 'assets/img/tng_ewallet_logo.png', qr: 'assets/img/success_icon.png' },
    { name: 'Boost', image: 'assets/img/boost_pay.png', qr: 'assets/img/protein_bar.png' },
    { name: 'Maybank QRPay', image: 'assets/img/maybank_qrpay.png', qr: 'assets/img/loading.jpg' },
    { name: 'Visa/MasterCard', image: 'assets/img/visa_mastercard.png', qr: 'assets/img/qr_code_sample.png' }
  ];

  qrCode: string | null = null;
  totalPrice = 123.45;
  cartItemCount = 1;

  constructor() {}

  generateQRCode(qrImage: string) {
    this.qrCode = qrImage;
  }
}
