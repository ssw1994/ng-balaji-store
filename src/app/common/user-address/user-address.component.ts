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

  allUserAddresses: Array<Address> = [];
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

  ngOnInit(): void {
    this.fetchUserAddress();
  }
}
