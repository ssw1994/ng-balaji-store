import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { FiltersComponent } from './filters/filters.component';
import { RouterModule, Routes } from '@angular/router';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../common/shared.module';
import { ListService } from './services/list.service';
import { BaseUrlInterceptor } from '../common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { filterFeature } from './store/reducers/filters.reducers';
import { EffectsModule } from '@ngrx/effects';
import { FilterEffects } from './store/effects/filters.effects';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: TableWrapperComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
    ],
  },
];

@NgModule({
  declarations: [
    DataTableComponent,
    TableWrapperComponent,
    FilterOptionsComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(filterFeature),
    EffectsModule.forFeature([FilterEffects]),
  ],
  providers: [
    ListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
})
export class FiltersModule {}
