import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/common';
import { AppFacde } from '../../store/app.facade';
import { CartItem } from '../models/cart.model';
import { CartsService } from '../services/carts.service';
import { CartFacade } from '../store/cart.facade';

@Component({
  selector: 'app-my-cart-list',
  templateUrl: './my-cart-list.component.html',
  styleUrls: ['./my-cart-list.component.scss'],
})
export class MyCartListComponent implements OnInit {
  get cartId(): string {
    const cartId = localStorage.getItem('cartId');
    return cartId ? cartId : '';
  }

  myItems$: Observable<Array<CartItem>>;
  isLoadingCartItems$: Observable<boolean>;
  constructor(
    private cartService: CartsService,
    private appFacade: AppFacde,
    private cartFacade: CartFacade
  ) {
    this.myItems$ = this.cartFacade.cartItems.data;
    this.isLoadingCartItems$ = this.cartFacade.cartItems.isLoading;
  }

  home() {
    this.appFacade.navigate({ pageName: 'home', pageURI: ['/'] });
  }

  ngOnInit(): void {
    this.cartFacade.fetchCartItems();
  }
}
