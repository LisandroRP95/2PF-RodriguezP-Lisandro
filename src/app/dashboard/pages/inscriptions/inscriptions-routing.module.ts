import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryDetailComponent } from '../categories/category-detail/category-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: ':id',
    component: CategoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }