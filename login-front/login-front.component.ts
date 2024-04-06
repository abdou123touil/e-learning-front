import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TeacherService } from 'src/app/Services/UserServices/TeacherServices/teacher.service';
import { StudentService } from 'src/app/Services/UserServices/StudentServices/student.service';
@Component({
  selector: 'app-login-front',
  standalone: true,
  imports: [CommonModule] ,
  templateUrl: './login-front.component.html',
  styleUrl: './login-front.component.css'
})
export class LoginFrontComponent implements OnInit{
  currentSignIn = 1;
  currentSignUp = 1;
  isSignUpActive = true;
  @ViewChild('emailS') emailSInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordS') passwordSInput!: ElementRef<HTMLInputElement>;
  @ViewChild('emailT') emailTInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordT') passwordTInput!: ElementRef<HTMLInputElement>;






  toggleSignUp(): void {
    this.isSignUpActive = !this.isSignUpActive;
    console.log('isSignUpActive:', this.isSignUpActive);
  }


  constructor(private studentService: StudentService,private teacherService: TeacherService, private router: Router,private snackBar: MatSnackBar,private formBuilder: FormBuilder) {}
  loginTeacher(event: Event) {
    event.preventDefault();
    this.teacherService.login(this.emailTInput.nativeElement.value, this.passwordTInput.nativeElement.value).subscribe(
      response => {
        console.log('Login response:', response);
        console.log(response.approved);
        if (response ) {
          if (!response.isVerfied){
            window.alert('please verify your email');
          }
          else{this.router.navigate(['/home']);}
        } else {
          // User is not verified
          window.alert('email or password incorrect');
        }
      },
      error => {
        console.error('Login error:', error);
        this.snackBar.open('Incorrect email or password', 'Dismiss', {
          duration: 13000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
      }
    );
  }
  loginStudent(event: Event){
    event.preventDefault();
    this.studentService.login(this.emailSInput.nativeElement.value, this.passwordSInput.nativeElement.value).subscribe(
      response => {
        console.log('Login response:', response);
        if (response ) {
          console.log(response.verfied);
          if (!response.verfied){
            window.alert('please verify your email');
          }
          else{this.router.navigate(['/home']);}
        } else {
          // User is not verified
          window.alert('email or password incorrect');
        }
       
      },
      error => {
        console.error('Login error:', error);
        this.snackBar.open('Incorrect email or password', 'Dismiss', {
          duration: 13000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
      }
    );
  }
  restlink(){
    this.router.navigate(['user/forgot-pass']);
  }
  registerlink(){
    this.router.navigate(['user/RegisterFront']);
  }

ngOnInit(): void {

}
}



