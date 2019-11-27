import { Component,OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthServiceService,private router:Router){}
  title = 'heleo-frontend';
  currentUser:any;
  ngOnInit(){
this.currentUser=localStorage.getItem('currentUser');
console.log(this.currentUser)
  }
  logOut(){
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
