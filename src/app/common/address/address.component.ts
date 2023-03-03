import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface AddressForm {
  name: FormControl<String | null>;
  address_line1: FormControl<String | null>;
  address_line2: FormControl<String | null>;
  city: FormControl<String | null>;
  state: FormControl<String | null>;
  country: FormControl<String | null>;
  zip_code: FormControl<String | null>;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup<AddressForm>;

  constructor(private formBuilder: FormBuilder) {
    this.addressForm = this.buildAddressForm();
  }

  buildAddressForm(): FormGroup<AddressForm> {
    return this.formBuilder.nonNullable.group<AddressForm>({
      name: new FormControl('', [Validators.required]),
      address_line1: new FormControl('', [Validators.required]),
      address_line2: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
}
