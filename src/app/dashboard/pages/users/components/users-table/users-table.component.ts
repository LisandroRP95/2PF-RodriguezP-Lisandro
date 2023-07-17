import { Component } from '@angular/core';
import { User } from '../../models';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Lisandro',
    surname: 'Rodriguez Peña',
    email: 'licharp41@gmai.com',
    password: '1234',
  }
];

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email'];
  dataSource = ELEMENT_DATA;

}
