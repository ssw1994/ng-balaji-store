import { Component, Input } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { CartsService } from '../services/carts.service';
@Component({
  selector: 'app-my-cart-item',
  templateUrl: './my-cart-item.component.html',
  styleUrls: ['./my-cart-item.component.scss'],
})
export class MyCartItemComponent {
  @Input()
  cartItem: CartItem;

  @Input()
  cartId: string;

  constructor(private cartService: CartsService) {}

  getQuantity(quantity: any) {
    console.log(quantity);
  }

  removeFromCart() {
    try {
      this.cartService
        .removeFromCart(this.cartItem._id, this.cartId)
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }
}
