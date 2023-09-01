import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './pages/home/home.module';
import { UsersModule } from './pages/users/users.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { NavMenuComponent } from './layout/nav-bar/nav-menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CategoriesModule } from './pages/categories/categories.module';




@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,



  
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HomeModule,
    UsersModule,
    RouterModule,
    SharedModule,
    CategoriesModule

  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
  
 }
