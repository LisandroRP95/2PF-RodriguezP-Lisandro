import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, take, map, mergeMap } from 'rxjs';
import { CreateUserData, UpdateUserData, User } from './models/index';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  private sendNotification$ = new Subject<string>();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {
    
    
    this.sendNotification$.subscribe({
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
  
  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      headers: new HttpHeaders({
        'token': 'carga de listado'
      }),
    }).subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los usuarios. Servidor inactivo');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }  

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      take(1),
      map((users) => users.find((u) => u.id === id)),
      )
  }

  createUser(payload: CreateUserData): void {

    const token = generateRandomString(20);

    this.httpClient.post<User>(environment.baseApiUrl + '/users', {...payload, token })
    .pipe(
      mergeMap((createdUser) => this.users$.pipe(
        take(1),
        map(
          (currentArray) => [...currentArray, createdUser])
        )
      )
    )
    .subscribe({
      next: (updatedArray) => {
        this._users$.next(updatedArray);
      }
      })
    }

  updateUserById(id: number, updatedUser: UpdateUserData): void {
    this.httpClient.put(environment.baseApiUrl + '/users/' + id, updatedUser).subscribe({
      next: () => this.loadUsers(),
    })
    }

  deleteUserById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + 'users/' + id)
    .pipe().subscribe({
      next: (updatedArray) => this.loadUsers(),
      error: (err) => this.notifier.showError('Ocurrio un error'),
      complete: () => {}
    })
  }
}
 