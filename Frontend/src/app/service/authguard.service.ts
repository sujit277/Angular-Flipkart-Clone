import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private router: Router) {}

  varIsLoggedIn = 'isLoggedIn';

  /* Method for Activating and Deactivating Routes based on Conditions */
  canActivate() {
    let bReturn = true;
    console.log(localStorage.getItem(this.varIsLoggedIn));
    if (localStorage.getItem(this.varIsLoggedIn) == 'false') {
      bReturn = false;
      alert('Sorry,You are not allowed to use this feature');
      this.router.navigate(['']);
    }
    return bReturn;
  }
}
