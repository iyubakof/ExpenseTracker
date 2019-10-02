import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: string;
  fullname: string;
  isAdmin:boolean;

  constructor(private loginService:LoginService, private router:Router) {
    this.user = sessionStorage.getItem('username');
    this.fullname = sessionStorage.getItem('fullname');

    if(this.user == 'admin'){
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }

  ngOnInit() {
  }

  logout(){
    sessionStorage.clear();
    this.loginService.setUserLogin(false);
    this.router.navigateByUrl('');
  }

}
