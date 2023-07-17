import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router
  ) {
  }

  setUserToSessionStorage(token: string) {
    localStorage.setItem('user', token);
  }
  getUserFromSessionStorage() {
    return localStorage.getItem('user');
  }

  getUserInfoFromToken() {
    const jwtTokenHandler = new JwtHelperService();
    const token = this.getUserFromSessionStorage()!;
    return jwtTokenHandler.decodeToken(token);
  }

  getUserInfoFromStorage(){
    return JSON.parse(localStorage.getItem("userPayload")!);
  }

  isLoggedIn(){
    return !!this.getUserFromSessionStorage();
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
