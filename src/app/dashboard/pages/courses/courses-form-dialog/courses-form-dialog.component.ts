import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../models';

@Component({
  selector: 'app-courses-form-dialog',
  templateUrl: './courses-form-dialog.component.html',
  styles: [
  ]
})
export class CoursesFormDialogComponent {

  editingCourse?: Course;
  nameControl = new FormControl<string | null>(null, [Validators.required]);
  descriptionControl = new FormControl<string | null>(null, [Validators.required]);
  courseCodeControl = new FormControl<number | null>(null, [Validators.required]);

  courseForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    courseCode: this.courseCodeControl 
  });

  constructor(
    private dialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course,
    ) {
      if(this.data){
        this.editingCourse = this.data;
        this.nameControl.setValue(this.data.name);
        this.descriptionControl.setValue(this.data.description);
      }
    }

  onSubmit(): void{
    if (this.courseForm.invalid){
      this.courseForm.markAllAsTouched();
    }else{
    this.dialogRef.close(this.courseForm.value);
  }}


}


