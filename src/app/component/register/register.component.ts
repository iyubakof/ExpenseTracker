import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { BudgetService } from 'src/app/service/budget.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  available: boolean = false;
  d = new Date();
  message: string;
  user: User = {
    id: null,
    username: null,
    password: null,
    fullname: null
  };

  constructor(private loginService: LoginService,
    private route: Router,
    private userService: UserServiceService,
    private budgetService: BudgetService) {

  }

  ngOnInit() {


  }

  onRegister(form: NgForm) {
    this.available = this.loginService.doesUserExist(this.user.username);

    if (!this.available) {
      console.log(this.user);
      this.userService.saveUser(this.user).subscribe(u => {
        this.message = "Account created! Please login to get started!";
        this.route.navigateByUrl('/register');
      });
    }
    else {
      this.message = "Username is not available. Please choose another."
      this.route.navigateByUrl('/register');
    }
  }

  goToLogin() {
    this.route.navigateByUrl('');
  }

}
