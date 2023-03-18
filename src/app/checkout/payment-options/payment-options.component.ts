import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartSummary } from '../../carts/models/cart.model';
import { CartsService } from '../../carts/services/carts.service';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss'],
})
export class PaymentOptionsComponent implements OnInit {
  private subscriptions = new Subscription();
  private stripe_key =
    'pk_test_51Kb3EcSIWAAUtzpKwkGBOL3OJtGbo8KEtWCYqjUowDNacnrlrLYCE2AzN0sObS2YMr5bfbF8fGyRNlDaWNiXKsgG00ZtiBhOfs';
  summary: CartSummary = {} as CartSummary;

  get cartId(): string {
    const cartId = localStorage.getItem('cartId');
    return cartId ? cartId : '';
  }

  get totalPay(): string {
    return 'Pay ' + this.summary?.cart_total;
  }

  paymentHandler: any = null;

  constructor(private cartService: CartsService) {}

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
  startPayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripe_key,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken });
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'User name',
      description: 'Buying at Balaji Store',
      amount: (this.summary.cart_total * 100).toFixed(2),
      currency: 'inr',
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripe_key,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  ngOnInit(): void {
    this.invokeStripe();
    this.fetchCartSummary();
  }
}
