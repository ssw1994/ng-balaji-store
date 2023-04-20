import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GeneralService } from '../services/utils/general.service';

interface AddressForm {
  name: FormControl<string | null>;
  mobile: FormControl<string | null>;
  email: FormControl<string | null>;
  address_line1: FormControl<string | null>;
  address_line2: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  country: FormControl<string | null>;
  zip_code: FormControl<string | null>;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup<AddressForm>;

  get userId(): string {
    const id = localStorage.getItem('userId');
    return id || '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {
    this.addressForm = this.buildAddressForm();
  }

  buildAddressForm(): FormGroup<AddressForm> {
    return this.formBuilder.nonNullable.group<AddressForm>({
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address_line1: new FormControl('', [Validators.required]),
      address_line2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
    });
  }

  hasError(control: string, error: string) {
    return this.addressForm.get(control)?.hasError(error);
  }

  save() {
    if (this.addressForm.valid) {
      const address = this.addressForm.getRawValue();
      this.generalService
        .saveUserAddress(this.userId, address)
        .subscribe((response) => {
          if (response.status === 200) {
            this.generalService.shipping_address$.next(address);
          }
          console.log(response);
        });
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {}
}
