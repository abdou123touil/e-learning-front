import { StudentService } from './../../../../Services/UserServices/StudentServices/student.service';
import { TeacherService } from 'src/app/Services/UserServices/TeacherServices/teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-front',
  templateUrl: './register-front.component.html',
  styleUrl: './register-front.component.scss'
})
export class RegisterFrontComponent implements OnInit{
  currentSignIn = 1;
  currentSignUp = 1;
  isSignUpActive = true;
  registrationForm!: FormGroup;
  registrationStudentForm!:FormGroup;
  constructor (private snackBar: MatSnackBar,private formBuilder: FormBuilder,private teacherService: TeacherService,private studentService: StudentService, private router: Router){}
  next(event: Event, isSignUp: boolean): void {
    event.preventDefault();

    if (isSignUp) {
      if (this.currentSignUp < 5) {
        this.currentSignUp++;
        this.updateBulletStateSignUp(true , isSignUp);
      }
    } else {
      if (this.currentSignIn < 5) {
        this.currentSignIn++;
        this.updateBulletStateSignIn(true , isSignUp);
      }
    }
  }

  prev(event: Event, isSignUp: boolean): void {
    event.preventDefault();

    if (isSignUp) {
      if (this.currentSignUp > 1) {
        this.currentSignUp--;
        this.updateBulletStateSignUp(false , isSignUp);
      }
    } else {
      if (this.currentSignIn > 1) {
        this.currentSignIn--;
        this.updateBulletStateSignIn(false , isSignUp);
      }
    }
  }



  toggleSignUp(): void {
    this.isSignUpActive = !this.isSignUpActive;
    console.log('isSignUpActive:', this.isSignUpActive);

    if (this.isSignUpActive) {
      this.currentSignIn = 1;
      this.currentSignUp = 1;
      this.updateBulletStateSignUp(true, this.isSignUpActive);
    } else {
      this.currentSignUp = 1;
      this.currentSignIn = 1;
      this.updateBulletStateSignIn(true, this.isSignUpActive);
    }
  }





  updateBulletStateSignUp(isNext: boolean, isSignUp: boolean): void {
    const bullets = document.querySelectorAll('.bullets');
    const checks = document.querySelectorAll('.checks');
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i] as HTMLElement;
      const ck = checks[i] as HTMLElement;
      bullet.classList.toggle('active', i < this.currentSignUp - 1);
      ck.classList.toggle('active', i < this.currentSignUp - 1);
    }
  }

  updateBulletStateSignIn(isNext: boolean, isSignUp: boolean): void {
    const bullets = document.querySelectorAll('.bullet');
    const checks = document.querySelectorAll('.check');
    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i] as HTMLElement;
      const ck = checks[i] as HTMLElement;
      bullet.classList.toggle('active', i < this.currentSignIn - 1);
      ck.classList.toggle('active', i < this.currentSignIn - 1);
    }
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      avatar: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registrationStudentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      adress: ['', Validators.required],
      wphone: ['', Validators.required],
      avatar: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  submit_teacher():void{

    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;
      console.log(formValues);
      this.teacherService.registerTeacher(
        formValues.firstname,
        formValues.lastname,
        formValues.mail,
        formValues.phone,
        formValues.dateOfBirth,
        formValues.avatar,
        formValues.username,
        formValues.password)
      .subscribe(
        response => {
          window.alert('teacher registered succssfuly');
          this.router.navigate(['user/RegisterFront']);
        },
        error => {


            if (error.message) {
              window.alert("this email is alredy existing");
              this.snackBar.open('this email is alredy existing', 'Dismiss', {
                duration: 13000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['custom-snackbar']
              });
            }


        }
      );

    } else {
      console.log('Form is invalid');
    }
  }
  submit_student(): void {
    if (this.registrationStudentForm.valid) {
      const formValues = this.registrationStudentForm.value;
      console.log(formValues);
      this.studentService.registerStudent(
        formValues.firstname,
        formValues.lastname,
        formValues.username,
        formValues.adress,
        formValues.email,
        formValues.password,
        formValues.phone,
        formValues.wphone,
        formValues.dateofbirth,
        formValues.avatar
        )
      .subscribe(
        response => {
          window.alert('student registered succssfuly');
          this.router.navigate(['user/RegisterFront']);
        },
        error => {
          if (error.message) {
            window.alert("this email is alredy existing");
            this.snackBar.open('this email is alredy existing', 'Dismiss', {
              duration: 13000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            });
          }

        }
      );

    } else {
      console.log('Form is invalid');
    }
  }

}
