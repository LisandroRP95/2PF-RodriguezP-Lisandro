import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, Subject, map, mergeMap } from 'rxjs';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import Swal from 'sweetalert2';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  public students$ = this._students$.asObservable();

  private sendNotifications$ = new Subject<string>();
  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {
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
    this._isLoading$.next(true);
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students', {
      headers: new HttpHeaders({
        'token': 'carga listado alumnos'
      }),
    }).subscribe({
      next: (response) => {
        this._students$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los alumnos');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  
  }

  getStudents(): Subject<Student[]> {
    return this._students$;
  }

  getStudentbyId(id: number): Observable<Student | undefined> {
    return this.students$.pipe(
      map((students) => students.find((s) => s.id === id)),
      take(1),
    )
  }

  createStudent(student: CreateStudentData): void {
    this.httpClient.post<Student>(environment.baseApiUrl + '/users', {...student })
    .pipe(
      mergeMap((createdStudent) => this.students$.pipe(
        take(1),
        map(
          (currentArray) => [...currentArray, createdStudent])
        )
      )
    )
    .subscribe({
      next: (updatedArray) => {
        this._students$.next(updatedArray);
      }
      })
  }

  updateStudentById(id: number, updatedStudent: UpdateStudentData): void {
    this.httpClient.put(environment.baseApiUrl + '/students/' + id, updatedStudent).subscribe({
      next: () => this.loadStudents(),
    })
  }

  deleteStudent(id: number): void{
    this.httpClient.delete(environment.baseApiUrl + 'students/' + id)
    .pipe(
      mergeMap(
        (deletedUserResponse) => this.students$.pipe(
          take(1),
          map((curentArray) => curentArray.filter((student) => student.id !== id))
        )
      )
    ).subscribe({
      next: (updatedArray) => this._students$.next(updatedArray),
    })
  }

  getSudentsByCourseId(courseId: number): Observable<Student[]>{
   return this.httpClient.get<Student[]>(environment.baseApiUrl + `/students?courseId=${courseId}`)
  }
}