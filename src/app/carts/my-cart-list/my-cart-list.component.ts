import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/common';
import { CartItem } from '../models/cart.model';
import { CartsService } from '../services/carts.service';

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

  myItems: Array<CartItem>;

  constructor(
    private cartService: CartsService,
    private navigationService: NavigationService
  ) {}

  home() {
    this.navigationService.setPage('home', ['/']);
  }

  ngOnInit(): void {
    this.cartService.getCartItems(this.cartId).subscribe((response: any) => {
      console.log(response);
      this.myItems = response.data;
    });
  }
}
