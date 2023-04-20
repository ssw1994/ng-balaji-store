import { Component } from '@angular/core';
import { AppFacde } from '../../store/app.facade';
import { AuthFacade } from '../store/facades/auth.facade';

@Component({
  selector: 'app-auth-btn',
  templateUrl: './auth-btn.component.html',
  styleUrls: ['./auth-btn.component.scss'],
})
export class AuthBtnComponent {
  get isLoggedIn(): boolean {
    const userId = localStorage.getItem('userId');
    return userId ? true : false;
  }

  constructor(private authFacade: AuthFacade, private appFacade: AppFacde) {}

  handleAction() {
    try {
      if (this.isLoggedIn) {
        this.authFacade.logout();
      } else {
        this.appFacade.navigate({
          pageName: 'Authenticate',
          pageURI: ['/', 'auth'],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
