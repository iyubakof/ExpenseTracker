import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Budget } from '../model/budget';
import { Observable } from 'rxjs';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Month': 'September'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private userUrl: string;

  constructor(private http:HttpClient) { 
    this.userUrl = `http://localhost:8080/users`
  }

  //get
  public findBudgetItems(userId:number): Observable<Budget[]> {
    const url = `${this.userUrl}/${userId}/budget`;
    return this.http.get<Budget[]>(url, httpHeaders);
  }

  //add
  public saveBudgetItem(userId: number, budget: Budget){
    const url = `${this.userUrl}/${userId}/budget`;
    return this.http.post<Budget>(url, budget, httpHeaders);
  }

  //update
  public updateBudgetItem(userId: number, budget: Budget){
    const url = `${this.userUrl}/${userId}/budget`;
    return this.http.put(url, budget, httpHeaders);
  }

  //delete
  public deleteBudgetItem(userId:number, id:number){
    const url = `${this.userUrl}/${userId}/budget/${id}`;
    return this.http.delete(url);
  }

}
