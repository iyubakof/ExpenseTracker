import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Budget } from '../model/budget';
import { Observable } from 'rxjs';
import { MonthService } from './month.service';

var d = new Date();
var m = d.getMonth();

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private userUrl: string;
  currMonth: string;

  constructor(private http: HttpClient, private month: MonthService) {
    this.userUrl = `http://localhost:8080/users`;
    this.currMonth = month.getMonthValue(m);
    console.log(this.currMonth);
  }

  //get
  public findBudgetItems(userId: number): Observable<Budget[]> {
    const url = `${this.userUrl}/${userId}/budget`;
    return this.http.get<Budget[]>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Month': `${this.currMonth}`
      })
    });
  }

  //add
  public saveBudgetItem(userId: number, budget: Budget) {
    const url = `${this.userUrl}/${userId}/budget`;
    return this.http.post<Budget>(url, budget, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Month': `${this.currMonth}`
      })
    });
  }

  //update
  public updateBudgetItem(userId: number, budget: Budget) {
    const url = `${this.userUrl}/${userId}/budget`;
    return this.http.put(url, budget, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Month': `${this.currMonth}`
      })
    });
  }

  //delete
  public deleteBudgetItem(userId: number, id: number) {
    const url = `${this.userUrl}/${userId}/budget/${id}`;
    return this.http.delete(url);
  }

}
