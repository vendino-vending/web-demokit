import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartService } from 'src/app/services/cart.service';

interface Item {
  slot: number; // ✅ Added slot number for search
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
  filteredItems: Item[] = []; // ✅ Store filtered items
  totalPrice: number = 0;

  constructor(
    private modalController: ModalController,
    public cartService: CartService
  ) {}

  ngOnInit() {
    // ✅ Initialize items with slot numbers
    this.items = [
      { slot: 1, name: '1. Protein Bar', price: 3.00, image: 'assets/img/protein_bar.png', soldOut: false, quantity: 0 },
      { slot: 2, name: '2. Energy Drink', price: 2.50, image: 'assets/img/energy_drink.png', soldOut: false, quantity: 0 },
      { slot: 3, name: '3. Water Bottle', price: 1.50, image: 'assets/img/water_bottle.png', soldOut: false, quantity: 0 },
      { slot: 4, name: '4. Burger', price: 4.50, image: 'assets/img/burger.png', soldOut: true, quantity: 0 }
    ];

    this.filteredItems = [...this.items]; // ✅ Set initial display
  }

  /**
   * ✅ Filters items by slot number
   */
  filterItems(event: any) {
    const searchTerm = event.target.value;

    if (!searchTerm) {
      this.filteredItems = [...this.items]; // ✅ Reset if empty
      return;
    }

    const slotNumber = parseInt(searchTerm, 10);
    if (!isNaN(slotNumber)) {
      this.filteredItems = this.items.filter(item => item.slot === slotNumber);
    }
  }

  /**
   * ✅ Add to cart only if item is NOT sold out
   */
  addToCart(item: Item) {
    if (item.soldOut) {
      console.log('This item is sold out and cannot be added.');
      return;
    }
    this.cartService.addToCart(item);
  }

  getTotalItemCount() {
    return this.cartService.getTotalItemCount();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  /**
   * ✅ Open Cart Modal
   */
  async openCartModal() {
    console.log('Opening cart modal...');
  
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: {
        cart: this.cartService.getCart(),
        totalPrice: this.cartService.getTotalPrice(),
      },
      cssClass: 'bottom-modal',
      backdropDismiss: false
    });

    return await modal.present();
  }
}