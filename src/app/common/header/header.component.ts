import { Component } from '@angular/core';
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

  constructor(private navigationService: NavigationService) {}

  home() {
    this.navigationService.setPage('home', '/');
  }

  async handleAction() {
    try {
      if (this.isLoggedIn) {
        localStorage.removeItem('userId');
      } else {
        await this.navigationService.setPage('Authenticate', ['/', 'auth']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
