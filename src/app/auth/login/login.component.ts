import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../store/facades/auth.facade';

interface LoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
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
    private authFacade: AuthFacade
  ) {
    this.buildLoginForm();
  }

  authenticate(event: any) {
    try {
      event && event.stopPropagation();
      const loginValues: any = this.loginForm.getRawValue();
      console.log(loginValues);
      this.authFacade.authenticate({
        username: loginValues.username,
        password: loginValues.password,
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
