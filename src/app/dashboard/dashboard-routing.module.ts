import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentDetailComponent } from './pages/students/student-detail/student-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesDetailComponent } from './pages/courses/courses-detail/courses-detail.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'users',
                loadChildren: () => import('./pages/users/users.module').then((typescriptModule) => typescriptModule.UsersModule)
            },
            {
                path: 'students',
                loadChildren: () => import('./pages/students/students.module').then((typescriptModule) => typescriptModule.StudentsModule)
            },
            {
                path: 'courses',
                loadChildren: () => import('./pages/courses/courses.module').then((typescriptModule) => typescriptModule.CoursesModule)
            },
            {
                path: 'inscriptions',
                component: InscriptionsComponent,
            },
            {
                path: '**',
                redirectTo: 'home',
            },
        ]),
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}