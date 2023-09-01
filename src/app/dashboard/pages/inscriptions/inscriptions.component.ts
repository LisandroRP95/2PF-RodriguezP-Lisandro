import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { Observable } from 'rxjs';
import { InscriptionWithStudentAndCourse } from './model';
import { selectInscriptions } from './store/inscriptions.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';



@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styles: [
  ]
})
export class InscriptionsComponent implements OnInit {
    displayedColumns = ['id', 'student', 'course'];

  inscriptions$: Observable<InscriptionWithStudentAndCourse[]>;
 
 constructor(private store: Store, private matDialog: MatDialog) {
  this.inscriptions$ = this.store.select(selectInscriptions)
 }

 onAdd(): void {
  this.matDialog.open(InscriptionDialogComponent);
 } 

 ngOnInit(): void {
   this.store.dispatch(InscriptionsActions.loadInscriptions())
 }
}
