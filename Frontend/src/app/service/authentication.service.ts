import { Injectable } from '@angular/core';
import { Login } from '../model/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  varIsLoggedIn = "isLoggedIn";

  /* Method for Setting Localstrorage after Login */
  login(){
    localStorage.setItem(this.varIsLoggedIn,"true");
  }
  /* Method for Setting Localstorage before Login */
  logout(){
    localStorage.setItem(this.varIsLoggedIn,"false");
  }
}

