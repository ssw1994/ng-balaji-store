import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartSummary } from '../../carts/models/cart.model';
import { CartsService } from '../../carts/services/carts.service';
import { AppFacde } from 'src/app/store/app.facade';
import { Observable } from 'rxjs';
import { CartFacade } from 'src/app/carts/store/cart.facade';

@Component({
  selector: 'app-my-cart-summary',
  templateUrl: './my-cart-summary.component.html',
  styleUrls: ['./my-cart-summary.component.scss'],
})
export class MyCartSummaryComponent implements OnInit {
  private subscriptions = new Subscription();

  summary$: Observable<CartSummary | null>;

  get cartId() {
    let _id = localStorage.getItem('cartId');
    return _id ?? '';
  }

  startCheckingOut() {
    this.appFacade.navigate({
      pageName: 'Checkout',
      pageURI: ['/', 'checkout'],
    });
  }

  fetchCartSummary() {
    this.cartFacde.fetchCartSummary();
  }

  private _currentURL: string;

  get showCheckoutButton(): boolean {
    return this._currentURL?.includes('my-cart');
  }

  constructor(
    private route: ActivatedRoute,
    private appFacade: AppFacde,
    private cartFacde: CartFacade
  ) {
    this.route.url.subscribe((currentRoute: Array<UrlSegment>) => {
      const url = currentRoute[0];
      this._currentURL = url?.path;
    });
    this.summary$ = this.cartFacde.cartSummary.data;
  }

  ngOnInit() {
    this.fetchCartSummary();
  }
}
