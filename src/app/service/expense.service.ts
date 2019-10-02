import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../model/expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private userUrl: string;

  constructor(private http:HttpClient) { 
    this.userUrl = `http://localhost:8080/users`;
   }

   //get
   public findAll(userId: number, month: number): Observable<Expense[]>{
     const url = `${this.userUrl}/${userId}/expense/month${month}`;
     return this.http.get<Expense[]>(url);
   }

   //add
   public saveExpense(userId: number, expense: Expense){
    const url = `${this.userUrl}/${userId}/expense`;
    return this.http.post<Expense>(url, expense);
   }

   //update
   public updateExpense(userId: number, expense: Expense){
    const url = `${this.userUrl}/${userId}/expense`;
    return this.http.put<Expense>(url, expense);
   }

   //delete
   public deleteExpense(userId: number, id: number){
    const url = `${this.userUrl}/${userId}/expense/${id}`;
    return this.http.delete<Expense>(url);
   }
}
