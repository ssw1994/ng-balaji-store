import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartSummary } from '../../carts/models/cart.model';
import { NavigationService } from '..';
import { CartsService } from '../../carts/services/carts.service';

@Component({
  selector: 'app-my-cart-summary',
  templateUrl: './my-cart-summary.component.html',
  styleUrls: ['./my-cart-summary.component.scss'],
})
export class MyCartSummaryComponent implements OnInit {
  private subscriptions = new Subscription();

  summary: CartSummary = {} as CartSummary;

  get cartId() {
    let _id = localStorage.getItem('cartId');
    return _id ?? '';
  }

  startCheckingOut() {
    this.navigationService.setPage('Checkout', ['/', 'checkout']);
  }

  fetchCartSummary() {
    this.subscriptions.add(
      this.cartService
        .getCartSummary(this.cartId)
        .subscribe((response: any) => {
          console.log(response);
          this.summary = response;
        })
    );
  }

  private _currentURL: string;

  get showCheckoutButton(): boolean {
    return this._currentURL?.includes('my-cart');
  }

  constructor(
    private cartService: CartsService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {
    this.route.url.subscribe((currentRoute: Array<UrlSegment>) => {
      const url = currentRoute[0];
      this._currentURL = url?.path;
    });
  }

  ngOnInit() {
    this.fetchCartSummary();
  }
}
