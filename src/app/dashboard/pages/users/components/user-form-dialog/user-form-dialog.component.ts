import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {

  nameControl = new FormControl(null, [Validators.required]);
  surnameControl = new FormControl(null, [Validators.required]);
  emailControl = new FormControl(null, [Validators.required]);
  passwordControl = new FormControl(null, [Validators.required]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl
  });

  onSubmit(): void{
    alert(JSON.stringify(this.userForm.value))
  }


}
