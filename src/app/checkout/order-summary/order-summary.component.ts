import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from '../../carts/models/cart.model';
import { CartsService } from '../../carts/services/carts.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  private subscriptions = new Subscription();

  get cartId(): string {
    const cartId = localStorage.getItem('cartId');
    return cartId ? cartId : '';
  }

  myItems: Array<CartItem>;
  constructor(private cartService: CartsService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.getCartItems(this.cartId).subscribe((response: any) => {
        this.myItems = response.data;
      })
    );
  }
}
