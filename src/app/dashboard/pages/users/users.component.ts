import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
public users: Observable<User[]>;
public isLoading$: Observable<boolean>;
public loading = false;

constructor(private matDialog: MatDialog, private UserService: UserService) {
 this.UserService.loadUsers();
 this.isLoading$ = this.UserService.isLoading$;
 this.users = this.UserService.getUsers();
  }

onCreateUser(): void {
  this.matDialog.open(UserFormDialogComponent)

  .afterClosed()
  .subscribe({
    next: (newUser) => {
      if (newUser){
      this.UserService.createUser({
        name: newUser.name,
        surname: newUser.surname,
        email:newUser.email,
        password: newUser.password,
        role: newUser.role
      });
  
      this.UserService.sendNotification('Se cargo el usuario');
    } else{}
  }
  })
}

onDeleteUser(userToDelete: User): void {
  if (confirm(`¿Realmente quiere eliminar a ${userToDelete.surname}, ${userToDelete.name}?`)){
     this.UserService.deleteUserById(userToDelete.id);
     this.UserService.sendNotification('Se elimino el ususario');
     }
}

onEditUser(userToEdit: User): void {
  this.matDialog.open(UserFormDialogComponent, {
    data: userToEdit
  })
  
  .afterClosed()
  .subscribe({
    next: (userUpdated) => {
      if (userUpdated){
        this.UserService.updateUserById(userToEdit.id, userUpdated);
        this.UserService.sendNotification('Ususario editado');
      }
    },
  }); 
}
}
