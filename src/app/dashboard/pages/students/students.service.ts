import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, Subject, map } from 'rxjs';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import Swal from 'sweetalert2';

const STUDENT_DB: Observable<Student[]> = of([
  {
    id: 1,
    name: 'Lisandro',
    surname: 'Rodriguez',
    birthYear: 1995,
  },
  {
    id: 2,
    name: 'Pedro',
    surname: 'Parquero',
    birthYear: 1962,
  },
  {
    id: 3,
    name: 'Bruno',
    surname: 'Dias',
    birthYear: 1940,
  },
])

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students$ = new BehaviorSubject<Student[]>([]);
  private _students$ = this.students$.asObservable();

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

  loadStudents(): void {
    STUDENT_DB.subscribe({
      next: (studentFromDb) => this.students$.next(studentFromDb)
    });
  }

  getStudents(): Subject<Student[]> {
    return this.students$;
  }

  getStudentbyId(id: number): Observable<Student | undefined> {
    return this._students$.pipe(
      map((students) => students.find((s) => s.id === id)),
      take(1),
    )
  }

  createStudent(student: CreateStudentData): void {
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.students$.next([
          ...arrayActual,
          {...student, id: arrayActual.length + 1},
        ]);
      },
    });
  }

  updateStudentById(id: number, updatedStudent: UpdateStudentData): void {
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.students$.next(
          arrayActual.map((student) => student.id === id? {...student, ...updatedStudent} : student)
        );
      },
    })
  }


  deleteStudent(id: number): void{
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.students$.next(
          arrayActual.filter((student) => student.id !== id));
      }
    })
  }
}