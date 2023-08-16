import { Component, OnInit, Input, Output,EventEmitter, Inject } from '@angular/core';
import { Student } from './models/index';
import { StudentsService } from './students.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{
  title = 'Componente-de-Alumnos';
  public dataSource: Student[] = [];
  public data$: Observable<Student[]>;
  public displayedColumns = ['id','name', 'surname','birthYear', 'actions'];

  @Input()
  dataSource2: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();

  constructor(
    private StudentsService: StudentsService,
    private MatDialog: MatDialog) {
    this.data$ = this.StudentsService.getStudents();
  }


  ngOnInit(): void {
    this.StudentsService.loadStudents();
    this.StudentsService.getStudents().subscribe();
  }

  onCreateStudent(): void{
    const dialogRef = this.MatDialog.open(StudentFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (newStudent) => {
        if (newStudent){
          this.StudentsService.createStudent({
            name: newStudent.name,
            surname: newStudent.surname,
            birthYear: newStudent.birthYear
          });
        
        } else {}
      },
    });
  }

  onDeleteStudent(id: number): void{
    this.StudentsService.deleteStudent(id);
    this.StudentsService.sendNotification('Se elimino el almuno');
  }

  onEditStudent(studentToEdit: Student): void {
  this.MatDialog.open(StudentFormDialogComponent, {
    data: studentToEdit
  })
  
  .afterClosed()
  .subscribe({
    next: (studentUpdated) => {
      if (studentUpdated){
        this.StudentsService.updateStudentById(studentToEdit.id, studentUpdated);
        this.StudentsService.sendNotification('Ususario editado');
      }
    },
  }); 
}
}
