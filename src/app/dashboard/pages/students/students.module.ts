import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class StudentsModule { }
