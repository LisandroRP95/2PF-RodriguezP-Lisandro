import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscriptionPayload, Inscription, InscriptionWithStudentAndCourse } from '../model';
import { environment } from 'src/environments/environment';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';


@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getInscriptionsFromDb().pipe(
          map(data => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadStudentsOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadStudentsOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getStudentOptions().pipe(
          map(data => InscriptionsActions.loadStudentsOptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadStudentsOptionsFailure({ error }))))
      )
    );
  });

  loadCoursesOpions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadCoursesOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCoursesOptions().pipe(
          map(data => InscriptionsActions.loadCoursesOptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadCoursesOptionsFailure({ error }))))
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createInscription(action.payload).pipe(
          map(data => InscriptionsActions.createInscriptionSuccess({ data })),
          catchError(error => of(InscriptionsActions.createInscriptionFailure({ error }))))
      )
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.createInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionsActions.loadInscriptions()))
    );
  }, {dispatch: false });

  constructor(
    private actions$: Actions, 
    private httpClient: HttpClient,
    private store: Store
  ) {}

  private getInscriptionsFromDb(): Observable<InscriptionWithStudentAndCourse[]> {
    return this.httpClient.get<InscriptionWithStudentAndCourse[]>(environment.baseApiUrl + '/inscriptions?_expand=student&_expand=course')
    }
   
   private  getStudentOptions(): Observable<Student[]> {
      return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
   }

   private getCoursesOptions(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses')
   }

   private createInscription(payload: CreateInscriptionPayload): Observable<Inscription> {
    return this.httpClient.post<Inscription>(environment.baseApiUrl + '/inscriptions', payload)
   }



  }
