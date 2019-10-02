import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/service/budget.service';
import { ExpenseService } from 'src/app/service/expense.service';
import { Router } from '@angular/router';
import { Budget } from 'src/app/model/budget';
import { DatePipe } from '@angular/common';
import { Expense } from 'src/app/model/expense';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  budgetItems: Budget[];
  types = [
    "Food/Dining",
    "Housing",
    "Bills",
    "Transportation",
    "Entertainment",
    "Health Care",
    "Misc"
  ];
  counter = 0;

  title: string;
  add: boolean;
  pipe = new DatePipe('en-US');

  newExpense: Expense = {
    id: null,
    userId: null,
    type: null,
    name: null,
    amount: null,
    date: null
  }

  constructor(private budgetService: BudgetService, private expenseService: ExpenseService, private router: Router) {
    
  }

  ngOnInit() {
    this.add = history.state.add;
    this.title = history.state.title;

    if (!this.add) {
      this.newExpense.id = history.state.id;
      this.newExpense.type = history.state.type;
      this.newExpense.name = history.state.name;
      this.newExpense.amount = history.state.amount;
      this.newExpense.date = this.pipe.transform(history.state.date, 'yyyy-MM-dd');
    }

    this.budgetItems.forEach(bi => {
      this.types[this.counter] = bi.category;
      this.counter++;
    });
  }

  addExpense() {
    this.expenseService.saveExpense(parseInt(sessionStorage.getItem('id')), this.newExpense).subscribe(expense => {
      console.log(expense);
    });
  }

  editExpense() {
    this.expenseService.updateExpense(parseInt(sessionStorage.getItem('id')), this.newExpense).subscribe(expense => {
      console.log(expense);
    });
  }

  onSubmit(form: NgForm) {
    if (this.add) {
      this.addExpense();
    }
    else {
      this.editExpense();
    }

    //redirect to expenses
    this.router.navigateByUrl('expense');
  }

}
