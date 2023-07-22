import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from '../user/user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, map, tap } from 'rxjs';


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

    this.users = this.UserService.getUsers().pipe(
    tap((valorOriginal) => console.log('valor antes del map', valorOriginal)),
    map((valorOriginal) =>
    valorOriginal.map((usuario)=>({
      ...usuario,
      name: usuario.name.toUpperCase(),
      surname:usuario.surname.toUpperCase(),
    }))
    ),
    tap((valorMapeado) => console.log('valor despues del map', valorMapeado)),
    );

    this.UserService.loadUsers();
  }

onCreateUser(): void {
  const dialogRef = this.matDialog.open(UserFormDialogComponent);

  dialogRef.afterClosed().subscribe({
    next: (newUser) => {
      if (newUser){
      this.UserService.createUser({
        name: newUser.name,
        surname: newUser.surname,
        email:newUser.email,
        password: newUser.password
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
