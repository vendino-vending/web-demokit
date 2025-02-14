import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // ✅ Import CartService

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false
})
export class PaymentPage implements OnInit {
  paymentMethods = [
    { name: 'GrabPay', image: 'assets/img/grab_pay.png', qr: 'assets/img/qr_code_sample.png' },
    { name: 'ShopeePay', image: 'assets/img/shopee_pay.png', qr: 'assets/img/protein_bar.png' },
    { name: 'TnG eWallet', image: 'assets/img/tng_ewallet_logo.png', qr: 'assets/img/success_icon.png' },
    { name: 'Boost', image: 'assets/img/boost_pay.png', qr: 'assets/img/fail_icon.png' },
    { name: 'Maybank QR Pay', image: 'assets/img/maybank_qrpay.png', qr: 'assets/img/loading.jpg' },
    { name: 'Visa', image: 'assets/img/visa_mastercard.png', qr: 'assets/img/qr_code_sample.png' }
  ];

  qrCode: string | null = null; // ✅ Stores the selected QR code image
  selectedPayment: string = ''; // ✅ Stores selected payment method
  totalPrice: number = 0; // ✅ Stores the total price from the cart
  cartItemCount: number = 0; // ✅ Stores the total item count from the cart

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.updateCartInfo(); // ✅ Load cart info when page initializes

    // ✅ Listen for changes in the cart
    this.cartService.cartChanged.subscribe(() => {
      this.updateCartInfo();
    });
  }

  // ✅ Fetch total price and item count from CartService
  updateCartInfo() {
    this.totalPrice = this.cartService.getTotalPrice();
    this.cartItemCount = this.cartService.getTotalItemCount();
  }

  // ✅ Highlight selected payment & update QR code
  selectPayment(method: any) {
    this.selectedPayment = method.name; // ✅ Save selected payment method
    this.qrCode = method.qr; // ✅ Display the QR Code
  }

  // ✅ Helper function to split array into chunks of 3 for proper display
  chunkArray(arr: any[], chunkSize: number): any[][] {
    let results = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      results.push(arr.slice(i, i + chunkSize));
    }
    return results;
  }
}