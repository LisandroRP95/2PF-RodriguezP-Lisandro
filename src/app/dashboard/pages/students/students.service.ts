import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take} from 'rxjs';
import { Student } from './models';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students$ = new BehaviorSubject<Student[]>([]);

  constructor() { }

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  };

  loadStudents(): void {
    this.students$.next([

      {
        id: 1,
        name: 'Lisandro',
        surname: 'Rodriguez Peña',
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
    ]);
  }

  createStudent(): void {
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        arrayActual.push({
          id: arrayActual.length + 1,
          name: 'Ricardo',
          surname: 'Perez',
          birthYear: 1985
        });

        this.students$.next(arrayActual);
      }
    })
  }

  deleteStudent(id: number): void{
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.students$.next(
          arrayActual.filter((student) => student.id !== id)
          );
      }
    })
  }
}