import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  get isLoggedIn(): boolean {
    const userId = localStorage.getItem('userId');
    if (userId && JSON.parse(userId)) return true;
    return false;
  }

  constructor() {}
}
