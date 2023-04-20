import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/auth/models/auth.model';
import { GeneralService } from '../services/utils/general.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  private subscriptions = new Subscription();
  get userId(): string {
    const userId = localStorage.getItem('userId');
    return userId || '';
  }

  allUserAddresses: Array<Address & { selected: boolean }> = [];
  constructor(private generalService: GeneralService) {}

  fetchUserAddress() {
    this.subscriptions.add(
      this.generalService
        .fetchUserAddress(this.userId)
        .subscribe((response) => {
          console.log(response);
          this.allUserAddresses = response;
        })
    );
  }

  toFullAddress(address: Address) {
    return `${address.address_line1},${address.address_line2} ,${address.city}, ${address.state},${address.country} ${address.zip_code}`;
  }

  removeAddress(address_id: string) {
    this.generalService
      .removeUserAddress({ user_id: this.userId, address_id })
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  useThisAddress(addresss: Address) {
    this.allUserAddresses = this.allUserAddresses.map((_adds) => {
      if (_adds._id === addresss._id) {
        this.generalService.shipping_address$.next(_adds);
        _adds.selected = true;
        return _adds;
      } else if (_adds.selected) {
        _adds.selected = false;
        return _adds;
      }
      return _adds;
    });
  }

  ngOnInit(): void {
    this.fetchUserAddress();
  }
}
