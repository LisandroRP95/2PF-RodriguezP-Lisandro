import {Component} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: [
  ],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
})
export class NotFoundComponent {

}
