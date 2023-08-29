import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionWithStudentAndCourse } from '../model';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  data: InscriptionWithStudentAndCourse[];
  courseOptions: Course[];
  studentOptions: Student[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  courseOptions: [],
  studentOptions: [],
  loading: false,
  error: null,

};

export const reducer = createReducer(
  initialState,

  on(InscriptionsActions.loadInscriptionss, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscriptionsActions.loadInscriptionssSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(InscriptionsActions.loadInscriptionssFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(InscriptionsActions.loadStudentsOptions, (state) => state),
  on(InscriptionsActions.loadStudentsOptionsSuccess, (state, action) => {
       return {
        ...state,
        studentOptions: action.data
       }
  }),

  on(InscriptionsActions.loadCoursesOptions, (state) => state),
  on(InscriptionsActions.loadCoursesOptionsSuccess, (state, action) => {
       return {
        ...state,
        coursesOptions: action.data
       }
  }),

);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

