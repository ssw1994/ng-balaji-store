import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppFacde } from '../../store/app.facade';

export enum Choice {
  new,
  old,
}

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent {
  newAddress = new FormControl(false);

  get isNewAddress(): boolean | null {
    return this.newAddress.value;
  }

  constructor(private appFacade: AppFacde) {
    this.newAddress.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  nextStep() {
    this.appFacade.navigate({
      pageName: 'payment',
      pageURI: ['/', 'checkout', 'payment-options'],
    });
  }
}
