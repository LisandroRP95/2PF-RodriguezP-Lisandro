import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../models';


@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent {
  editingStudent?: Student;
  nameControl = new FormControl<string | null >(null, [Validators.required]);
  surnameControl = new FormControl<string | null >(null, [Validators.required]);
  birthYearControl = new FormControl<number | null>(null, [Validators.required]);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    birthYear: this.birthYearControl 
  });

  constructor(
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student,
    ) {
      if(this.data){
        this.editingStudent = this.data;
        this.nameControl.setValue(this.data.name);
        this.surnameControl.setValue(this.data.surname);
      }
    }

  onSubmit(): void{
    if (this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
    this.dialogRef.close(this.studentForm.value);
  }}


}

