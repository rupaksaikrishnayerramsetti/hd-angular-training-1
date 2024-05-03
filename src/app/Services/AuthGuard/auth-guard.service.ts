import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate: CanActivateFn = () => {
    const name = localStorage.getItem('name');
    if(name) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
