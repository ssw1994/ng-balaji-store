import { Component } from '@angular/core';
import { NavigationService } from '../../common';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent {
  constructor(private navigationService: NavigationService) {}

  nextStep() {
    this.navigationService.setPage('payment', [
      '/',
      'checkout',
      'payment-options',
    ]);
  }
}
