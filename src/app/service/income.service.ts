import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Income } from '../model/income';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private userUrl: string;

  constructor(private http:HttpClient) { 
    this.userUrl = `http://localhost:8080/users`;
  }

  //get
  public findAll(userId: number, month: number): Observable<Income[]> {
    const url = `${this.userUrl}/${userId}/income/month${month}`;
    return this.http.get<Income[]>(url);
  }

  //add
  public saveIncome(userId: number, income: Income){
    const url = `${this.userUrl}/${userId}/income`;
    return this.http.post<Income>(url, income);
  }


  //update
  public updateIncome(userId: number, income: Income){
    const url = `${this.userUrl}/${userId}/income`;
    return this.http.put(url, income);
  }


  //delete
  public deleteIncome(userId: number, id: number){
    const url = `${this.userUrl}/${userId}/income/${id}`;
    return this.http.delete(url);
  }

}
