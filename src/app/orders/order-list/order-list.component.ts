import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  get userId(): string {
    const _id = localStorage.getItem('userId');
    return _id ?? '';
  }

  orders: Array<Order> = [];

  constructor(private orderService: OrdersService) {}

  fetchMyOrders() {
    this.orderService.fetchMyOrders(this.userId).subscribe((response: any) => {
      console.log(response);
      this.orders = response.data;
    });
  }

  ngOnInit(): void {
    this.fetchMyOrders();
  }
}
