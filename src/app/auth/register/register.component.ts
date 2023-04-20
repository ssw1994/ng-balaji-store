import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { GeneralService } from '../../common';
import { Address } from '../models/auth.model';
import { AuthFacade } from '../store/facades/auth.facade';

interface RegisterForm {
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  mobile?: FormControl<string | null>;
  repassword?: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup<RegisterForm>;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private generalService: GeneralService
  ) {
    this.buildRegisterForm();
  }

  get password() {
    return this.registerForm?.get('password')?.value;
  }

  private matchPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value === this.password) {
        return null;
      }
      return { missmatch: true };
    };
  }

  buildRegisterForm() {
    try {
      this.registerForm = this.fb.nonNullable.group<RegisterForm>({
        username: new FormControl(''),
        password: new FormControl(''),
        mobile: new FormControl(''),
        email: new FormControl(''),
        repassword: new FormControl('', [this.matchPassword()]),
      });
    } catch (error) {}
  }

  register() {
    try {
      const registerValues: any = this.registerForm.getRawValue();
      this.authFacade.register(registerValues);
    } catch (error) {}
  }

  private _userLocation: Address | null;

  ngOnInit(): void {
    try {
      this.generalService.getFullAddress().subscribe((location) => {
        this._userLocation = location;
      });
    } catch (error) {}
  }
}
