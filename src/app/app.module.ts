import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoursesModule } from './dashboard/pages/courses/courses.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './dashboard/pages/students/students.module';
import { InscriptionsModule } from './dashboard/pages/inscriptions/inscriptions.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthModule,
    CoursesModule,
    StudentsModule,
    InscriptionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
