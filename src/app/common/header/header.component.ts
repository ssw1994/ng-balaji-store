import { Component } from '@angular/core';
import { AuthFacade } from '../../auth/store/facades/auth.facade';
import { AppFacde } from '../../store/app.facade';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    const userId = localStorage.getItem('userId');
    return userId ? true : false;
  }

  constructor(private appFacade: AppFacde, private authFacade: AuthFacade) {}

  home() {
    this.appFacade.navigate({ pageName: 'home', pageURI: '/' });
  }
}
