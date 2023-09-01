import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from './models';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';
import { selectCoursesArray } from './store/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent  implements OnInit{
    courses$: Observable<Course[]>;
    public dataSource: Course[] = [];
    // public data$: Observable<Course[]>;
    public displayedColumns = ['id','name', 'description','courseCode', 'actions'];
  
    @Input()
    dataSource2: Course[] = [];
  
    @Output()
    deleteCourse = new EventEmitter<Course>();
  
    @Output()
    editCourse = new EventEmitter<Course>();
  
    constructor(
      private CoursesService: CoursesService,
      private store: Store,
      private MatDialog: MatDialog) {
      
      this.courses$ = this.store.select(selectCoursesArray);
      // this.data$ = this.CoursesService.getCourses();
    }
  
  
    ngOnInit(): void {
      this.store.dispatch(CoursesActions.loadCourses())
      // this.CoursesService.loadCourses();
      // this.CoursesService.getCourses().subscribe();
    }
  
    onCreateCourses(): void{
      const dialogRef = this.MatDialog.open(CoursesFormDialogComponent);
  
      dialogRef.afterClosed().subscribe({
        next: (newCourse) => {
          if (newCourse){
            this.CoursesService.createCourse({
              name: newCourse.name,
              description: newCourse.description,
              courseCode: newCourse.courseCode,
              categoryId: newCourse.categoryId
            });
          
          } else {}
        },
      });
    }
  
    onDeleteCourse(id: number): void{
      this.CoursesService.deleteCourse(id);
      this.CoursesService.sendNotification('Se elimino el curso');
    }
  
    onEditCourse(courseToEdit: Course): void {
    this.MatDialog.open(CoursesFormDialogComponent, {
      data: courseToEdit
    })
    
    .afterClosed()
    .subscribe({
      next: (courseUpdated) => {
        if (courseUpdated){
          this.CoursesService.updateCourseById(courseToEdit.id, courseUpdated);
          this.CoursesService.sendNotification('Curso editado');
        }
      },
    }); 
  }
  }
  
