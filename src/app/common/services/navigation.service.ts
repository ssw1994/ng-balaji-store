import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private titleService: Title) {}

  private async navigateByPath(pagePath: string[]) {
    try {
      await this.router.navigate(pagePath);
    } catch (error) {
      console.error(error);
    }
  }

  setPageTitle(pageName: string) {
    this.titleService.setTitle(pageName);
  }

  private async navigateByURL(pageURL: string) {
    try {
      await this.router.navigateByUrl(pageURL);
    } catch (error) {
      console.error(error);
    }
  }

  async setPage(pageName: string, pageURI: string | string[]) {
    try {
      this.setPageTitle(pageName);
      if (pageURI instanceof Array) {
        this.navigateByPath(pageURI);
      } else {
        this.navigateByURL(pageURI);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
