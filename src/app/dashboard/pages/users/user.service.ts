import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, of, delay, take, map } from 'rxjs';
import { CreateUserData, UpdateUserData, User } from './models/index';
import { NotifierService } from 'src/app/core/services/notifier.service';
import Swal from 'sweetalert2';

const USER_DB: Observable<User[]> = of([
  {
    id: 1,
    name: 'Lisandro',
    surname: 'Rodriguez',
    email: 'lrodriguez@mail.com',
    password: '1345553'
  }
]).pipe(delay(500));

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users$ = new BehaviorSubject<User[]>([]);
  private _users$ = this.users$.asObservable();

  private sendNotification$ = new Subject<string>();

  constructor(private nofitier: NotifierService) {
    
    
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
    USER_DB.subscribe({
      next: (userFromDb) =>  this.users$.next(userFromDb)
    });
  }  

  getUsers(): Subject<User[]> {
    return this.users$;
  }

  getUserById(id: number): Observable<User | undefined> {
    return this._users$.pipe(
      map((users) => users.find((u) => u.id === id)),
      take(1),
      )
  }

  createUser(user: CreateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (currentArray) => {
        this.users$.next([
          ...currentArray, 
          {...user, id: currentArray.length + 1},
        ]);
      },
    });
  }

  updateUserById(id: number, updatedUser: UpdateUserData): void {
   this.users$.pipe(take(1)).subscribe({
      next: (currentArray) => {
        this.users$.next(
          currentArray.map((user) => user.id === id? {...user, ...updatedUser} : user)
        );
      },
   });
  }

  deleteUserById(id: number): void {
    this.users$.pipe(take(1)).subscribe({
      next: (currentArray) => this.users$.next(currentArray.filter((user) => user.id !== id)),
    })
  }
}

