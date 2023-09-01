import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from "src/app/dashboard/pages/users/models";
import { NotifierService } from "src/app/core/services/notifier.service";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from "@ngrx/store";
import { authActions } from "../store/auth/auth.actions";
import { selectAuthUser } from "../store/auth/auth.selectiors";

@Injectable({ providedIn: 'root' })

export class AuthService {

    public authUser$ = this.store.select(selectAuthUser);

    constructor(private notifier: NotifierService, 
                private router: Router,
                private httpClient: HttpClient,
                private store: Store
                ) {}

    isAuthenticated(): Observable<boolean>{
        return this.httpClient.get<User[]>('http://localhost:3000/users', {
            params: {
                token: localStorage.getItem('token') || '',
            }
        }).pipe(
            map((usersResult) => {

            if (usersResult.length) {
                const authUser = usersResult[0];
                    
                    this.store.dispatch(authActions.setAuthUser({ payload: authUser }));
                  }
                return !!usersResult.length
            })
        )
    }

    login(payload: LoginPayload): void {
        this.httpClient.get<User[]>('http://localhost:3000/users', {
            params: {
                email: payload.email || '',
                password: payload.password || ''
            }
        }).subscribe({
            next: (response) => {
                if (response.length) { 
                    const authUser = response[0];
                    this.store.dispatch(authActions.setAuthUser({payload: authUser}));

                    this.router.navigate(['/dashboard/home']);
                    
                    localStorage.setItem('token', authUser.token);
                }else{
                    this.notifier.showError('Dirección email inválida');
                    
                    this.store.dispatch(authActions.setAuthUser({payload: null}));
                }
            },
            error: (err) => {
                if (err instanceof HttpErrorResponse) {
                    let message = 'Ocurrio un error insperado';
                    if(err.status === 500){
                    }
                    if(err.status ===401){
                    message = 'Email o contraseña invalida';
                    }
                    this.notifier.showError(message)
                }
        }
    }) 
 }

 public logout(): void {
    this.store.dispatch(authActions.setAuthUser({ payload: null }))
 }
} 