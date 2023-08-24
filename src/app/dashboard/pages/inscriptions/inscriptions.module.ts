import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InscriptionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: InscriptionsComponent}])
  ]
})
export class InscriptionsModule { }
