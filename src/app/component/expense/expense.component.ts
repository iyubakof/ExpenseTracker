import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/model/expense';
import { ExpenseService } from 'src/app/service/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseItems: Expense[];
  error: string;
  sum: number = 0;


  constructor(private expenseService: ExpenseService, private router: Router) { }

  ngOnInit() {
    this.fetchExpenses();
  }

  fetchExpenses(){
    this.expenseService.findAll(parseInt(sessionStorage.getItem('id')), 9).subscribe(data => {
      this.expenseItems = data;
    },
      error => this.error = error);
  }

  totalExpense() {
    if (this.sum == 0) {
      this.expenseItems.forEach(e => {
        this.sum = this.sum + e.amount;
      });

      return this.sum;
    }

    this.sum = 0;
  }

  update(expense: Expense) {
    this.router.navigateByUrl('expenseform', {
      state:
      {
        add: false,
        title: 'Edit Expense',
        id: expense.id,
        type: expense.type,
        name: expense.name,
        amount: expense.amount,
        date: expense.date
      }
    });
  }

  delete(id: number) {
    let yes = confirm("You are about to delete this record.\nDo you wish to proceed?");

    if (yes) {
      //delete
      this.expenseService.deleteExpense(parseInt(sessionStorage.getItem('id')), id).subscribe(data => {
        this.ngOnInit();
      });

    }
  }

}
