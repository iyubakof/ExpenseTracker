import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { NgForm } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  valid:boolean = false;
  available:boolean = false;
  message: string;
  user: User = {
    id: null,
    username: null,
    password: null,
    fullname: null
  };

  constructor(private loginService: LoginService, private route: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.valid = this.loginService.verifyUser(this.user.username, this.user.password);

    if(this.valid){
      this.route.navigate(['dashboard']);
    }
    else {
      this.message = "Invalid Credentials";
      this.route.navigateByUrl('');
    }
  }

  goRegister(){
    this.route.navigateByUrl('/register');
  }

}
