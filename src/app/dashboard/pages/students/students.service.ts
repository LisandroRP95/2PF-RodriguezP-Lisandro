import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students$ = new BehaviorSubject([]);

  constructor() { }

  loadStudents(): void {
    this.students$.next([])
  }
}
