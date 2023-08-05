import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';
import { RouterModule } from '@angular/router';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentsRoutingModule } from './students-routing.module';




@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormDialogComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
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
export class StudentsModule { }
