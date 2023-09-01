import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateInscriptionPayload, Inscription, InscriptionWithStudentAndCourse } from '../model';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithStudentAndCourse[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Students Options': emptyProps(),
    'Load Students Options Success': props<{ data: Student[] }>(),
    'Load Students Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses Options': emptyProps(),
    'Load Courses Options Success': props<{ data: Course[] }>(),
    'Load Courses Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: CreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});
