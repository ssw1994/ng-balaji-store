import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutStepperComponent } from '../checkout/checkout-stepper/checkout-stepper.component';
import { RouterModule, Routes } from '@angular/router';
import { CartsModule } from '../carts/carts.module';
import { SharedModule } from '../common';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutStepperComponent,
    children: [
      {
        path: 'address',
        component: DeliveryAddressComponent,
      },
      {
        path: 'payment-options',
        component: PaymentOptionsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'address',
      },
    ],
  },
];

@NgModule({
  declarations: [
    CheckoutStepperComponent,
    DeliveryAddressComponent,
    PaymentOptionsComponent,
    OrderSummaryComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CheckoutModule {}
