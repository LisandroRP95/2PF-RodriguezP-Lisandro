import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../students/students.service';
import { Student } from '../../students/models';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../store/courses.actions';
import { Observable } from 'rxjs';
import { selectCourseDetailName } from '../store/courses.selectors';


@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styles: [
  ]
})
export class CoursesDetailComponent implements OnInit {

  displayedColumns = ['id', 'name', 'courseCode'];
  students: Student[] = [];
  courseName$: Observable<string | undefined>; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private store: Store
    ) {
      console.log(this.activatedRoute.snapshot.params);
      this.courseName$ = this.store.select(selectCourseDetailName);
    }

    ngOnInit(): void {
      this.store.dispatch(CoursesActions.loadCoursesDetail({courseId: this.activatedRoute.snapshot.params['id']}))

      
      this.studentsService.getSudentsByCourseId(this.activatedRoute.snapshot.params['id']).subscribe({
        next: (students) => (this.students = students),
      })
    }
  }
  
