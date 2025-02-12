import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service'; // ✅ Import CartService

interface Item {
  name: string;
  price: number;
  image: string;
  soldOut: boolean;
  quantity: number;
}

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  standalone: false
})
export class CartModalComponent implements AfterViewInit {
  @Input() cart: Item[] = [];
  @Input() totalPrice: number = 0;
  @ViewChild('modalElement', { static: false }) modalElement!: ElementRef;

  constructor(
    private modalController: ModalController,
    private cartService: CartService // ✅ Inject CartService correctly
  ) {}

  ngAfterViewInit() {
    // ✅ Disable swipe-to-close gesture
    const modal = this.modalElement?.nativeElement;
    if (modal) {
      modal.gestureCtrl?.create({
        gestureName: 'block-swipe',
        direction: 'y',
        threshold: 0,
        canStart: () => true,
        onMove: () => {},
        onEnd: () => {},
      })?.enable(true);
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal();
    }
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter(cartItem => cartItem !== item);
    this.updateTotal();
  }

  updateTotal() {
    this.totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  saveAndClose() {
    this.cartService.updateCart(this.cart, this.totalPrice); // ✅ Save updated cart
    this.modalController.dismiss(); // ✅ Close modal
  }
}
