import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TokenApiModel } from '../Models/token-api.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload:any;
private baseUrl: string ="https://localhost:7010/api/User/"
  constructor(private http : HttpClient,private router:Router,private toast: NgToastService) 
  { 
    this.userPayload = this.decodedToken();
  }

  signup(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  
  }
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }
  signOut(){
    localStorage.clear();
    this.toast.success({detail:"SUCCESS", summary:"exited successfully"})
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token') //token varsa true yoksa false döndür
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  // auth.service.ts

  getFirstNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name[0];
    }
    return null;
  }
  getLastNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name[1];
    }
    return null;
  }
    getIdFromToken() {
      if(this.userPayload)
      return this.userPayload.UserId;
    }
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }

}
