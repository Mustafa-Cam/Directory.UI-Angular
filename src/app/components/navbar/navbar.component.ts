import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService) { }
  public users:any = [];
  public role!:string;
  public fullName : string = "";
  public firstName : string = "";
public lastName :string = ""
islogin:Boolean = false;
  ngOnInit() {
    // this.api.getUsers()
    // .subscribe(res=>{
    // this.users = res;
    // });

    this.userStore.getFirstNameFromStore()
    .subscribe(val=>{
      const firstNameFromToken = this.auth.getFirstNameFromToken();
      this.firstName = val || firstNameFromToken
    });
    this.userStore.getLastNameFromStore()
    .subscribe(val=>{
      const firstNameFromToken = this.auth.getLastNameFromToken();
      this.lastName = val || firstNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    if(this.auth.isLoggedIn()){
      this.islogin=true;
    }
    else{
      this.islogin=false;
    }
  }

  
  logout(){
    this.auth.signOut();
    this.firstName="";
  }
  

}
