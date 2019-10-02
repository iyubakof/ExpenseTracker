import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  error:string;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.findAllUsers().subscribe(data => {
      this.users = data;
    },
    error => this.error = error);
  }

}
