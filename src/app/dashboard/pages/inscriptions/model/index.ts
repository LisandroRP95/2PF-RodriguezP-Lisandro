import { Course } from '../../courses/models';
import { Student } from '../../students/models/index';

export interface Inscription {
    id: number,
    studentId: number,
    courseId: number
  }

  export interface InscriptionWithStudentAndCourse extends Inscription {
    student: Student;
    couse: Course
  }

  export interface CreateInscriptionPayload {
    studentId: number | null,
    courseId: number | null
  }