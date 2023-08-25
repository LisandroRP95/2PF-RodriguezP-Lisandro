import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormDialogComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffects]) 
  ],
  providers: [
    {
      provide: 'IS_DEV',
      useValue: true,
    } 
  ]
})
export class CoursesModule { }
