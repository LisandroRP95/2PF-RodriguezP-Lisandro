import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoursesService } from '../../courses/courses.service';
import { Course } from '../../courses/models';
import { selectCategoryDetailName } from '../store/categories.selectors';
import { CategoriesActions } from '../store/categories.actions';
import { COURSES_MOCK } from '../../courses/mocks';
import { Category } from '../models';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styles: [
  ]
})
export class CategoryDetailComponent implements OnInit {

  displayedColumns = ['id', 'name'];
  course: Course[] = COURSES_MOCK;
  categoryName$: Observable<string | undefined>;

  @Input()
  dataCategory: Category[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store,
  ) {
    this.categoryName$ = this.store.select(selectCategoryDetailName);
  }

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategoryDetail({ categoryId: this.activatedRoute.snapshot.params['id'] }))


    this.coursesService.getCourseByCategoryId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (courses) => (this.course = courses),
    })
  }
}