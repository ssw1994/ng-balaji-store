import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/common';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss'],
})
export class FilterOptionsComponent implements OnInit {
  private subscriptions = new Subscription();
  constructor(private generateService: GeneralService) {}

  categories: Array<string>;

  private setSubscriptions() {
    this.subscriptions.add(
      this.generateService.getCategories().subscribe((response) => {
        console.log(response);
        this.categories = response.body?.categories ?? [];
      })
    );
  }

  ngOnInit(): void {
    this.setSubscriptions();
  }
}
