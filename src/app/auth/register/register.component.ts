import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface RegisterForm {
  username: FormControl<String | null>;
  email: FormControl<String | null>;
  password: FormControl<String | null>;
  mobile?: FormControl<String | null>;
  repassword?: FormControl<String | null>;
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
    private authService: AuthService,
    private router: Router
  ) {
    this.buildRegisterForm();
  }

  get password() {
    return this.registerForm?.get('password')?.value;
  }

  private matchPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      console.log(control.value);
      if (control.value === this.password) {
        return null;
      }
      return { missmatch: true };
    };
  }

  buildRegisterForm() {
    try {
      this.registerForm = this.fb.group<RegisterForm>({
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
      const registerValues = this.registerForm.getRawValue();
      console.log(registerValues);
      this.authService
        .register(registerValues)
        .subscribe(async (response: any) => {
          console.log(response);
          if (localStorage) {
            localStorage.setItem('userId', response.id);
          }
          await this.router.navigate(['/', 'products']);
        });
    } catch (error) {}
  }

  ngOnInit(): void {
    try {
    } catch (error) {}
  }
}
