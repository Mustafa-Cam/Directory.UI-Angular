import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private firstName$ = new BehaviorSubject<string>("");
  private lastName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private Id$ = new BehaviorSubject<number>(0);
  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname:string){
    this.fullName$.next(fullname)
  }
  public getFirstNameFromStore(){
    return this.firstName$.asObservable();
  }
  public getLastNameFromStore(){
    return this.lastName$.asObservable();
  }
  public setFirstNameForStore(firstname:string){
      this.firstName$.next(firstname)
    }

    public setLastNameForStore(lastname:string){
      this.lastName$.next(lastname)
    }
  public setIdFromStore(Id:number){
     this.Id$.next(Id)
  }

  public getIdFromStore(){ 
    return this.Id$.asObservable();
  }

  public getIDFromStore(){

    return this.Id$.asObservable();
  }
  
}
