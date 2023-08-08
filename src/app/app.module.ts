import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoursesModule } from './dashboard/pages/courses/courses.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsModule } from './dashboard/pages/students/students.module';
import { InscriptionsModule } from './dashboard/pages/inscriptions/inscriptions.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoursesModule,
    StudentsModule,
    InscriptionsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
