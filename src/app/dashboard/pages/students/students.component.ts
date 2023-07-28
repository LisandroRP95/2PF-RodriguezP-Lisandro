import { Component, OnInit } from '@angular/core';
import { Student } from './models/index';
import { StudentsService } from './students.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{
  public dataSource: Student[] = [];
  public displayedColumns = ['id','name', 'surname','birthYear'];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {

  }
}
