import { Injectable } from '@angular/core';
import { User } from '../users/models';
import { Subject, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Lisandro',
      surname: 'Rodriguez',
      email: 'lrodriguez@mail.com',
      password: '1345553'
    }
  ];

  private users$ = new BehaviorSubject<User[]>([]);

  private sendNotification$ = new Subject<string>();

  constructor() {
    this.sendNotification$.subscribe({
      next: () => Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se cargo el usuario',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }



  sendNotification(notification: string): void {
    this.sendNotification$.next(notification);
  }

  loadUsers(): void {
    this.users$.next(this.users);
  }  

  getUsers(): Subject<User[]> {
    return this.users$;
  }
}
