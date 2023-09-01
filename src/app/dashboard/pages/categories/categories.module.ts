import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { categoriesFeature } from './store/categories.reducer';
import { CategoriesRoutingModule } from './categories-routing.module';



@NgModule({
  declarations: [
  CategoryDetailComponent,
  CategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule,
    StoreModule.forFeature(categoriesFeature),
    RouterModule.forChild([{path: '', component: CategoriesComponent }])
  ]
})
export class CategoriesModule { }
