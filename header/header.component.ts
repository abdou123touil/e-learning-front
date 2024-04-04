import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/Services/UserServices/TeacherServices/teacher.service';
import { StudentService } from 'src/app/Services/UserServices/StudentServices/student.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUserName: string | null = null;

  constructor(private studentService: StudentService,private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the loggedInUserName Observable
    this.studentService.loggedInUserName.subscribe(
      username => {
        
        this.loggedInUserName = username;
      }
    );
    this.teacherService.loggedInUserName.subscribe(
      Username => {
        
        this.loggedInUserName = Username;
      }
    );
  }

  isLoggedInS(): boolean {
    console.log(this.studentService.isLoggedIn());
    return this.studentService.isLoggedIn();
  }
  isLoggedInT(): boolean {
    console.log(this.teacherService.isLoggedIn());
    return this.teacherService.isLoggedIn();
  }
  logoutS(): void {
    // Call the logout method of the StudentService
    this.studentService.logout();
    this.teacherService.logout();
    console.log(this.studentService.logout())
  }
  
  loginpage(){
    this.router.navigate(['user/login']);
  }
}


