import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface LoginForm {
  username: FormControl<String | null>;
  password: FormControl<String | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildLoginForm();
  }

  authenticate() {
    try {
      const loginValues = this.loginForm.getRawValue();
      console.log(loginValues);
      this.authService
        .authenticate(loginValues)
        .subscribe(async (response: any) => {
          if (response) {
            console.log(response);
            if (localStorage) {
              localStorage.setItem('userId', response.id);
              localStorage.setItem('cartId', response.cartId);
              await this.router.navigate(['/', 'products']);
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  private buildLoginForm(): void {
    try {
      this.loginForm = this.formBuilder.group<LoginForm>({
        username: new FormControl(''),
        password: new FormControl(''),
      });
    } catch (error) {}
  }
}
