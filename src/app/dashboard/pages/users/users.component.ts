import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from '../user/user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

public users: Observable<User[]>;

constructor(
  private matDialog: MatDialog,
  private UserService: UserService,
  private nofitier: NotifierService,
  @Inject('IS_DEV') private isDev: boolean,
  ) {

    this.users = this.UserService.getUsers();
    this.UserService.loadUsers();
    // this.UserService.getUsers().subscribe({
    //   next: (users) => {
    //     this.users = users;
    //   }
    // });
  }

onCreateUser(): void {
  const dialogRef = this.matDialog.open(UserFormDialogComponent);

  dialogRef.afterClosed().subscribe({
    next: (newUser) => {
      if (newUser){
      // this.users = [
      //   // ...this.users,
      //   // {
      //   //     id: this.users,
      //   //     name: newUser.name,
      //   //     surname: newUser.surname,
      //   //     email: newUser.email,
      //   //     password: newUser.password
      //   //   },
          
      // ];        
      this.UserService.sendNotification('Se cargo el usuario');
    } else{}
  }
  })
}

onDeleteUser(userToDelete: User): void {
console.log(userToDelete);
  if (confirm(`¿Realmente quiere eliminar a ${userToDelete.surname}, ${userToDelete.name}?`)){
    
  }
}

onEditUser(userToEdit: User): void {
  this.matDialog.open(UserFormDialogComponent, {
    data: userToEdit
  })
  
  .afterClosed()
  .subscribe({
    next: (userUpdated) => {
      console.log(userUpdated);
    if (userUpdated) {}

  },
  });
  
}

}
