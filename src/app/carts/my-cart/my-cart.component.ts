import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { BaseUrlInterceptor } from 'src/app/common';
import { CartsService } from '../services/carts.service';

@Component({
  standalone: true,
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
  imports: [MatButtonModule, MatIconModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
})
export class MyCartComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  get cartId(): string | null {
    return localStorage.getItem('cartId');
  }

  get isLoggedIn(): boolean {
    const cartId = this.cartId;
    return cartId ? true : false;
  }

  quantity: number;

  constructor(private cartService: CartsService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService
        .getCartItemQuantity(this.cartId)
        .subscribe((quantity) => {
          this.quantity = quantity;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
