import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
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
