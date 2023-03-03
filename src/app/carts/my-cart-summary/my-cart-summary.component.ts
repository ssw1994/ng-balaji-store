import { Component } from '@angular/core';

@Component({
  selector: 'app-my-cart-summary',
  templateUrl: './my-cart-summary.component.html',
  styleUrls: ['./my-cart-summary.component.scss'],
})
export class MyCartSummaryComponent {
  totalAmount: number = 0;
  orderTotal: number = 0;
  noOfItems: number = 0;
  discount: number = 0;
  deliveryCharges: number = 0;
}
