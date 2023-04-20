import { Component, HostListener, Input } from '@angular/core';
import { AppFacde } from '../../store/app.facade';
import { CartItem } from '../../carts/models/cart.model';
import { CartsService } from '../../carts/services/carts.service';
@Component({
  selector: 'app-my-cart-item',
  templateUrl: './my-cart-item.component.html',
  styleUrls: ['./my-cart-item.component.scss'],
})
export class MyCartItemComponent {
  @HostListener('click')
  itemClick() {
    this.appFacade.navigate({
      pageName: this.cartItem.title,
      pageURI: ['/', 'products', 'details', this.cartItem._id],
    });
  }

  @Input()
  cartItem: CartItem;

  @Input()
  cartId: string;

  constructor(private cartService: CartsService, private appFacade: AppFacde) {}

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
