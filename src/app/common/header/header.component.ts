import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  async handleAction() {
    try {
      if (this.isLoggedIn) {
        localStorage.removeItem('userId');
      } else {
        await this.router.navigate(['/', 'auth']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
