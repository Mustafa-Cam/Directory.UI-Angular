import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EditDirectoryComponent } from './components/edit-directory/edit-directory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component'; 
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EditDirectoryComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent ,
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgToastModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
