import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    {
      provide: 'IS_DEV',
      useValue: true,
    } 
  ]
})
export class CoursesModule { }
