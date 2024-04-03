import { Component } from '@angular/core';
import { StudentService } from './../../../../Services/UserServices/StudentServices/student.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',

  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  emailInputVisible = true;
  tokenInputVisible = false;
  resetPasswordInputVisible = false;
  errorMessage = '';
  tokenErrorMessage = '';
  resetPasswordErrorMessage = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  sendToken(email: string): void {
    this.studentService.sendForgotPasswordEmail(email)
      .subscribe(
        response => {
          console.log('Forgot password email sent:', response);
          this.emailInputVisible = false;
          this.tokenInputVisible = true;
          this.errorMessage = '';
          this.tokenErrorMessage = '';
          this.resetPasswordErrorMessage = '';
        },
        error => {
          console.error('Error sending forgot password email:', error);
          this.errorMessage = 'your email is invalide.';
          this.tokenInputVisible = false;
          this.resetPasswordInputVisible = false;
        }
      );
  }

  validateToken(token: string): void {
    this.studentService.validateToken(token)
      .subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Token validated:', response);
            this.tokenInputVisible = false;
            this.resetPasswordInputVisible = true;
            this.resetPasswordErrorMessage = '';
          } else {
            console.error('Error validating token:', response.message);
            this.tokenErrorMessage = 'An error occurred while validating the token. Please try again.';
          }
        },
        error => {
          console.error('Error validating token:', error);
          this.tokenErrorMessage = 'An error occurred while validating the token. Please try again.';
        }
      );
  }
  resetPassword(email: string, password: string): void {
    this.studentService.resetPassword(email, password)
      .subscribe(
        response => {
          console.log('Password reset:', response);
          this.resetPasswordErrorMessage = '';
          // Show the reset password input upon successful password reset
          this.resetPasswordInputVisible = true;
          window.alert('Your password has been reset. Please log in with your new password.');
        },
        error => {
          console.error('Error resetting password:', error);
          this.resetPasswordErrorMessage = 'An error occurred while resetting the password. Please try again.';
        }
      );
  }
}
