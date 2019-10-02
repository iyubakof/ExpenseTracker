import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[];
  valid: boolean = false;
  currentUser:any;
  isUserLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn')||'false');

  constructor(private userService: UserServiceService) { 
    userService.findAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  //verify user
  verifyUser(username: string, password: string) {      
    for (let i = 0; i < this.users.length; i++) {
      if (username == this.users[i].username && password == this.users[i].password) {
        this.valid = true;
        this.isUserLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn')||'false');
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', this.users[i].username);
        sessionStorage.setItem('id', this.users[i].id.toString());
        sessionStorage.setItem('fullname', this.users[i].fullname);
        break;
      }
    }

    return this.valid;
  }

  isUserLogIn():boolean{
    return JSON.parse(sessionStorage.getItem('loggedIn')||this.isUserLoggedIn);
  }

  setUserLogin(status:boolean){
    this.isUserLoggedIn = status;
  }

  getCurrentUser() {
    this.currentUser = sessionStorage.getItem('id');
    return JSON.parse(this.currentUser);
  }
}
