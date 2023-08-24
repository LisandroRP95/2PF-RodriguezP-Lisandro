import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from 'src/app/store/inscriptions.actions';
import { selectInscriptionsState, selectInscriptionsStateValue } from 'src/app/store/inscriptions.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styles: [
  ]
})
export class InscriptionsComponent {
 
 public value$: Observable<number>; 

 constructor(private store: Store) {

  this.value$ = this.store.select(selectInscriptionsStateValue);
 }

 onIncrement(): void {
  this.store.dispatch(InscriptionsActions.increment());
 }

 onDecrement(): void {
  this.store.dispatch(InscriptionsActions.decrement());
 }
}
