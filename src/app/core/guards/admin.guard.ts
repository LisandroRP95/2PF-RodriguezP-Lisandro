import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectiors';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
 
  
  return inject(Store).select(selectIsAdmin).pipe(

    map((isAdmin) => {

      console.log(adminGuard.name, 'Solo acceso Admin')
      if(!isAdmin) return router.createUrlTree(['/dashboard/home'])

      return true;

    })
  )
};
