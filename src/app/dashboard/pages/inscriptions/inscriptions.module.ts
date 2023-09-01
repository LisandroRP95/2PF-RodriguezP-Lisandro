import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';



@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionsRoutingModule,
    RouterModule.forChild([{path: '', component: InscriptionsComponent}]),
    EffectsModule.forFeature([InscriptionsEffects]),
    StoreModule.forFeature(inscriptionsFeature)
  ]
})
export class InscriptionsModule { }
