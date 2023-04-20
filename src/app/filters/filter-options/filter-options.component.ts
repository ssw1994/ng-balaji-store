import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/common';
import { FilterFacade } from '../store/facades/filters.facades';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss'],
})
export class FilterOptionsComponent implements OnInit {
  private subscriptions = new Subscription();
  categoryFormControl = new FormControl<string>('');
  constructor(
    private generateService: GeneralService,
    private filterFacade: FilterFacade
  ) {
    this.subscriptions.add(
      this.categoryFormControl.valueChanges.subscribe((category: any) => {
        console.log('Category ---->', category);
        this.filterFacade.updateFilters({
          category,
        });
      })
    );
  }
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
