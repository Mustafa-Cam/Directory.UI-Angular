import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import ValidateForm from 'src/app/helpers/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm!:FormGroup 

  constructor(private fb: FormBuilder,private auth:AuthService,private userStore: UserStoreService,private router:Router,private toast:NgToastService) {}
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onlogin(){
    if(this.loginForm.valid){
    this.auth.login(this.loginForm.value).subscribe({
    next:(res)=>{
      console.log("girdi")
      this.loginForm.reset();
      this.auth.storeToken(res.token);  
      const tokenPayload = this.auth.decodedToken();
      // this.userStore.setFullNameForStore(tokenPayload.name[0]);
      this.userStore.setLastNameForStore(tokenPayload.lastName)
      this.userStore.setIdFromStore(tokenPayload.userId);
      this.userStore.setFirstNameForStore(tokenPayload.name[0]);
      this.userStore.setRoleForStore(tokenPayload.role); 
      this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
      this.router.navigate(['dashboard']).then(() => {
        window.location.reload();
      });
  },
  error: (err) => {
    this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
    // console.log(err);
  }, 
  })}
else{
  ValidateForm.validateAllFormFields(this.loginForm);
}
}
}
