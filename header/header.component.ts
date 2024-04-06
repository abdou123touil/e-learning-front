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
 

  constructor(private studentService: StudentService,private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the loggedInUserName Observable
    this.studentService.loggedInUserName.subscribe(
      username => {
        
        this.loggedInUserName = username;
        console.log(username);
      }
    );
    this.teacherService.loggedInUserName.subscribe(
      Username => {
        
        this.loggedInUserName = Username;
        console.log(Username);
      }
    );
  }
  loggedInUserName: string | null = null;
  isLoggedInS(): boolean {
 
    return this.studentService.isLoggedIn();
  }
  isLoggedInT(): boolean {
   
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


