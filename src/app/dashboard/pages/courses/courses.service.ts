import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, Subject, map } from 'rxjs';
import { CreateCourseData, Course, UpdateCourseData } from './models';
import Swal from 'sweetalert2';

const COURSES_DB: Observable<Course[]> = of([
  {
    id: 1,
    name: 'Angular',
    description: 'Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página.',
    courseCode: 2016,
    courseId: 1001
  },
  {
    id: 2,
    name: 'C++',
    description: 'C++ es un lenguaje de programación diseñado en 1979 por Bjarne Stroustrup. La intención de su creación fue extender al lenguaje de programación C y añadir mecanismos que permiten la manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, C++ es un lenguaje híbrido. ',
    courseCode: 1979,
    courseId: 2001

  },
  {
    id: 3,
    name: 'Java',
    description: 'Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez en 1995 por Sun Microsystems.',
    courseCode: 1995,
    courseId: 1001

  },
])

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses$ = new BehaviorSubject<Course[]>([]);
  private _courses$ = this.courses$.asObservable();

  private sendNotifications$ = new Subject<string>();

  constructor() {
    this.sendNotifications$.subscribe({
      next: (message) =>
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      }),
    });
  }

  sendNotification(notification: string): void{
    this.sendNotifications$.next(notification);
  }

  loadCourses(): void {
    COURSES_DB.subscribe({
      next: (courseFromDb) => this.courses$.next(courseFromDb)
    });
  }

  getCourses(): Subject<Course[]> {
    return this.courses$;
  }

  getCoursesbyId(id: number): Observable<Course | undefined> {
    return this._courses$.pipe(
      map((courses) => courses.find((c) => c.id === id)),
      take(1),
    )
  }

  createCourse(course: CreateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next([
          ...arrayActual,
          {...course, id: arrayActual.length + 1},
        ]);
      },
    });
  }

  updateCourseById(id: number, updatedCourse: UpdateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next(
          arrayActual.map((course) => course.id === id? {...course, ...updatedCourse} : course)
        );
      },
    })
  }

  deleteCourse(id: number): void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next(
          arrayActual.filter((course) => course.id !== id));
      }
    })
  }
}
