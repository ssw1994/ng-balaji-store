import { Component, Input } from '@angular/core';
import { CartItem } from '../../carts/models/cart.model';
import { AppFacde } from '../../store/app.facade';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent {
  onClick(order: CartItem) {
    const { product_id } = order;
    if (product_id) {
      this.appFacade.navigate({
        pageName: product_id,
        pageURI: ['/', 'products', 'details', product_id],
      });
    }
  }

  @Input()
  orders: [CartItem];

  constructor(private appFacade: AppFacde) {}
}
