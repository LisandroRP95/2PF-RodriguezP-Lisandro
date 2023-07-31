import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models';
import { StudentsService } from '../students.service';
import { User } from '../../users/models/index';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: [
  ]
})
export class StudentDetailComponent {


public student: Student | null = null;
public studentId?: number;

constructor(
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private StudentsService: StudentsService
  ) {
 if (!Number(this.activatedRoute.snapshot.params['id'])) {
  this.router.navigate(['dashboard', 'students']);
 } else {
  this.studentId = Number(this.activatedRoute.snapshot.params['id']);

  this.loadStudent();
 }
}


loadStudent(): void{
  if(this.studentId){
    this.StudentsService.getStudentbyId(this.studentId).subscribe({
      next: (user) => (user),
      
    })
  }
}
}
