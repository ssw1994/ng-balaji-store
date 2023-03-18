import { Component, HostListener, Input } from '@angular/core';
import { NavigationService } from '../../common';
import { CartItem } from '../models/cart.model';
import { CartsService } from '../services/carts.service';
@Component({
  selector: 'app-my-cart-item',
  templateUrl: './my-cart-item.component.html',
  styleUrls: ['./my-cart-item.component.scss'],
})
export class MyCartItemComponent {
  @HostListener('click')
  itemClick() {
    this.navigationService.setPage(this.cartItem.title, [
      '/',
      'products',
      'details',
      this.cartItem._id,
    ]);
  }

  @Input()
  cartItem: CartItem;

  @Input()
  cartId: string;

  constructor(
    private cartService: CartsService,
    private navigationService: NavigationService
  ) {}

  getQuantity(quantity: any) {
    this.cartService
      .updateQuantity({
        cartId: this.cartItem.cartId,
        productId: this.cartItem._id,
        quantity,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  removeFromCart(event: any) {
    try {
      event && event.stopPropagation();
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
