import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent {

  public user: User | null = null;

  constructor(private activatedRoute: ActivatedRoute){
    this.activatedRoute.snapshot.params['id']
  }


  loadUser(): void{

  }
}
