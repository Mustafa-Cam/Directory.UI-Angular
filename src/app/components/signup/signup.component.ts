import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);

      this.auth.signup(this.signUpForm.value)
      .subscribe({ 
      
        next: (res => {
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error: (err => {

          alert(err?.error.message);
        }),
      });
     
    }
    else{
      console.log(this.signUpForm.value);
     
    }
  }
}
