import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentsComponent } from './students.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('StudentsComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, MatDialogModule],
    declarations: [StudentsComponent]
  }));

  it('Deberia crear a Alumnos', () => {
    const fixture = TestBed.createComponent(StudentsComponent);
    const alumnos = fixture.componentInstance;

    
    expect(alumnos).toBeTruthy();
  });

  it(`Dederia tener titulo 'Componente-de-Alumnos'`, () => {
    const fixture = TestBed.createComponent(StudentsComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Componente-de-Alumnos');
  });

});