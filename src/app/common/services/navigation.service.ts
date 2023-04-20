import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Page } from '../models/app.models';

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

  setPageTitle(pageName: string | null) {
    if (!pageName) return;
    this.titleService.setTitle(pageName);
  }

  private async navigateByURL(pageURL: string | null) {
    try {
      if (!pageURL) return;
      await this.router.navigateByUrl(pageURL);
    } catch (error) {
      console.error(error);
    }
  }

  async setPage(page: Page) {
    try {
      const { pageName, pageURI } = page;
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
