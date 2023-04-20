import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from '../common';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-orders',
        component: OrderListComponent,
      },
      {
        path: '',
        redirectTo: 'my-orders',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [OrdersComponent, OrderListComponent, MyOrderComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class OrdersModule {}
