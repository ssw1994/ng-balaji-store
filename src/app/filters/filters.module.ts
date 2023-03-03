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
