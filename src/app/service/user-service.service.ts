import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userUrl: string;

  constructor(private http: HttpClient) { 
    this.userUrl = 'http://localhost:8080/users';
  }

  //get
  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  //post
  public saveUser(user: User){
    console.log("creating user...");
    return this.http.post<User>(this.userUrl, user);
  }

  //put
  public updateUser(user: User): Observable<User>{
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  //delete
  public deleteUser(id:number): Observable<{}>{
    const url = `${this.userUrl}/${id}`;
    return this.http.delete(url);
  }

}
