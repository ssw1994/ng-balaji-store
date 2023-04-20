import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Subscription } from 'rxjs';
import { Address } from 'src/app/auth/models/auth.model';
import {
  ConfirmChoice,
  GeneralService,
  PAYMENT_METHOD,
  AbstractOrder,
} from 'src/app/common';
import { CartItem, CartSummary } from '../../carts/models/cart.model';
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
  get userId(): string {
    const userId = localStorage.getItem('userId');
    return userId ? userId : '';
  }

  get totalPay(): string {
    return 'Pay ' + this.summary?.cart_total;
  }

  paymentHandler: any = null;

  paymentMethod = new FormControl(PAYMENT_METHOD.cod);
  method = PAYMENT_METHOD;
  constructor(
    private cartService: CartsService,
    private dialog: MatDialog,
    private generalService: GeneralService
  ) {}

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
  cartItems: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
  fetchCartItems() {
    this.subscriptions.add(
      this.cartService
        .getCartItems(this.cartId)
        .pipe(
          map((response: any) => {
            const items = response?.data ?? [];
            return items.map((item: CartItem) => {
              return {
                product_id: item._id,
                quantity: item.quantity,
                price: item.price,
              };
            });
          })
        )
        .subscribe((response: any) => {
          this.cartItems = response;
        })
    );
  }

  private handleOtherPaymentMethods() {
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

  placeCodOrder() {
    const orderObj: AbstractOrder = {
      customer_id: this.userId,
      items: this.cartItems,
      total_price: this.summary?.cart_total,
      billing_address: this.shipping_address,
      shipping_address: this.shipping_address,
      payment_method: this.paymentMethod.value,
    };

    this.cartService.placeOrder(orderObj).subscribe((response) => {
      console.log(response);
    });
  }

  private async handleCOD() {
    const { ConfirmBoxComponent } = await import('../../common');
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '25%',
      height: '250px',
      data: {
        title: 'Confirm order',
        message: `<div>do you want to proceed with order of INR <strong>${this.summary?.cart_total} ?</strong></div>`,
      },
    });

    dialogRef.afterClosed().subscribe((result: ConfirmChoice) => {
      switch (result) {
        case ConfirmChoice.cancel:
          break;
        default:
          console.log('Place COD order');
          this.placeCodOrder();
      }
    });
  }

  startPayment() {
    const choice = this.paymentMethod.value;
    switch (choice) {
      case PAYMENT_METHOD.cards:
      case PAYMENT_METHOD.upi:
      case PAYMENT_METHOD.netbanking:
        this.handleOtherPaymentMethods();
        break;
      default:
        this.handleCOD();
    }
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
          token: function (stripeToken: any) {},
        });
      };
      window.document.body.appendChild(script);
    }
  }

  shipping_address: Address | null;
  ngOnInit(): void {
    this.invokeStripe();
    this.fetchCartSummary();
    this.fetchCartItems();

    this.subscriptions.add(
      this.generalService.shipping_address$.subscribe(
        (address: Address | null) => {
          this.shipping_address = address;
        }
      )
    );
  }
}
