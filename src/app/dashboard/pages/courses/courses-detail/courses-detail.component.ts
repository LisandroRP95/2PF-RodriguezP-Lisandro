import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models';
import { CoursesService } from '../courses.service';


@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styles: [
  ]
})
export class CoursesDetailComponent {

  public course: Course | null = null;
  public courseId?: number;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private CoursesService: CoursesService
    ) {
   if (!Number(this.activatedRoute.snapshot.params['id'])) {
    this.router.navigate(['dashboard', 'courses']);
   } else {
    this.courseId = Number(this.activatedRoute.snapshot.params['id']);
  
    this.loadCourses();
   }
  }
  
  
  loadCourses(): void{
    if(this.courseId){
      this.CoursesService.getCoursesbyId(this.courseId).subscribe({
        next: (course) => course,
        
      })
    }
  }
  }
  
