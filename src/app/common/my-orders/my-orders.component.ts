import { Component, HostListener } from '@angular/core';
import { AppFacde } from '../../store/app.facade';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent {
  @HostListener('click')
  gotoMyOrders() {
    this.appFacade.navigate({
      pageName: 'my-orders',
      pageURI: ['/', 'orders'],
    });
  }

  private _myOrders: number;

  get userId(): string {
    const _id = localStorage.getItem('userId');
    return _id ?? '';
  }

  get myOders(): number {
    return this._myOrders;
  }

  set myOders(order: number) {
    this._myOrders = order;
  }

  constructor(
    private orderService: OrdersService,
    private appFacade: AppFacde
  ) {}

  fetchMyOders() {
    this.orderService.fetchOrdersCount(this.userId).subscribe((response) => {
      this.myOders = response.orders;
    });
  }

  ngOnInit(): void {
    this.fetchMyOders();
  }
}
