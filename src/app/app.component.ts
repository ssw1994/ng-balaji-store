import { Component } from '@angular/core';
import { AppService } from './store/app.service';
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

  constructor(private appService: AppService) {
    console.log(this.appService.userId);
  }
}
