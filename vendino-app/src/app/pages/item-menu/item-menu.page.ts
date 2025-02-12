import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartService } from 'src/app/services/cart.service';

interface Item {
  name: string;
  price: number;
  image: string;
  soldOut: boolean;
  quantity: number;
}

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.page.html',
  styleUrls: ['./item-menu.page.scss'],
  standalone: false
})
export class ItemMenuPage implements OnInit {
  items: Item[] = [];
  totalPrice: number = 0; // Add totalPrice property

  constructor(
    private modalController: ModalController,
    public cartService: CartService // ✅ Inject CartService
  ) {}

  ngOnInit() {
    this.items = [
      { name: 'Protein Bar', price: 3.00, image: 'assets/img/protein_bar.png', soldOut: false, quantity: 0 },
      { name: 'Energy Drink', price: 2.50, image: 'assets/img/energy_drink.png', soldOut: false, quantity: 0 },
      { name: 'Water Bottle', price: 1.50, image: 'assets/img/water_bottle.png', soldOut: false, quantity: 0 }
    ];
  }

  addToCart(item: Item) { // Define the type of item parameter
    if (item.soldOut) return;
    this.cartService.addToCart(item); // ✅ Use service to add items
  }

  getTotalItemCount() {
    return this.cartService.getTotalItemCount(); // ✅ Get count from service
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice(); // ✅ Get price from service
  }

  clearCart() {
    this.cartService.clearCart(); // ✅ Clear cart using service
  }

  async openCartModal() {
    console.log('Opening cart modal...');
  
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: {
        cart: this.cartService.getCart(),
        totalPrice: this.cartService.getTotalPrice(),
      },
      cssClass: 'bottom-modal',
      backdropDismiss: false // ✅ Prevents tapping outside to close
    });
  
    return await modal.present();
  }  
}


