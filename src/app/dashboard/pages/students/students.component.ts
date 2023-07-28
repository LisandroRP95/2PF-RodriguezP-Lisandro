import { Component, OnInit } from '@angular/core';
import { Student } from './models/index';
import { StudentsService } from './students.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{
  public dataSource: Student[] = [];
  public data$: Observable<Student[]>;
  public displayedColumns = ['id','name', 'surname','birthYear', 'actions'];

  constructor(private studentsService: StudentsService) {
    this.data$ = this.studentsService.getStudents();
  }

  ngOnInit(): void {
    this.studentsService.loadStudents();
    this.studentsService.getStudents().subscribe();
  }

  onCreateStudent(): void{
    this.studentsService.createStudent();
  }

  onDeleteStudent(id: number): void{
    this.studentsService.deleteStudent(id);
  }
}
