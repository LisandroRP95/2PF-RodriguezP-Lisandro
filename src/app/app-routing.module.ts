import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((typescriptModule) => typescriptModule.DashboardModule)
  },

  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((typescriptModule) => typescriptModule.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full', 
    redirectTo: '/auth/login',
  },
  {
    path: '**', 
    component: NotFoundComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
