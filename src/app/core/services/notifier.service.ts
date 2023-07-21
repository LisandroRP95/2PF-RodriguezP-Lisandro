import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

interface MyCustomNotification {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private notifier$ = new Subject<MyCustomNotification>()

  constructor() {
    this.notifier$.subscribe({
      next: (myNotification) =>{
        Swal.fire(myNotification.title, myNotification.message, myNotification.type)
      }
    })
  }

  showSuccess(message: string, title: 'Existoso'): void{
    this.notifier$.next({
      type: 'success',
      title,
      message,

    });
  }
}
