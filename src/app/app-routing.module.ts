import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { UserDetailComponent } from './dashboard/pages/users/pages/user-detail/user-detail.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { InscriptionsComponent } from './dashboard/pages/inscriptions/inscriptions.component';
import { StudentDetailComponent } from './dashboard/pages/students/student-detail/student-detail.component';
import { CoursesDetailComponent } from './dashboard/pages/courses/courses-detail/courses-detail.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        component: UserDetailComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'students/:id',
        component: StudentDetailComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'courses/:id',
        component: CoursesDetailComponent
      },

      {
        path: 'inscriptions',
        component: InscriptionsComponent
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ],
  },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
