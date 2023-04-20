import { Injectable } from '@angular/core';
import { AuthFacade } from '../auth/store/facades/auth.facade';
import { AppFacde } from './app.facade';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  userId: string;
  cartId: string;

  constructor(private authFacade: AuthFacade) {
    console.log('Initialied');
    this.authFacade.userId$.subscribe((t) => {
      console.log(t);
      if (t) {
        localStorage.setItem('userId', t);
      }
    });

    this.authFacade.cartId$.subscribe((t) => {
      if (t) {
        localStorage.setItem('cartId', t);
      }
    });
  }
}
