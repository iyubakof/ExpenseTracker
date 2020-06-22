import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/model/budget';
import { BudgetService } from 'src/app/service/budget.service';
import { ExpenseService } from 'src/app/service/expense.service';
import { Expense } from 'src/app/model/expense';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetItems: Budget[];
  expenseItems: Expense[];

  error: string;
  sum: number = 0;
  progress: number;
  budgetSum: number;
  d = new Date();
  m = this.d.getMonth() + 1;

  constructor(private budgetService: BudgetService, private expenseService: ExpenseService) { }

  ngOnInit() {
    this.budgetService.findBudgetItems(parseInt(sessionStorage.getItem('id'))).subscribe(data => {
      this.budgetItems = data;
    },
      error => this.error = error);

    this.expenseService.findAll(parseInt(sessionStorage.getItem('id')), this.m).subscribe(edata => {
      this.expenseItems = edata;
    },
      error => this.error = error);

    // this.calcProgress();
  }

  getCurrMonth() {
    var months: string[] = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December"];

    let currMonth = months[this.d.getMonth()];

    return currMonth;
  }

  totalBudget() {
    this.sum = 0;

    if (this.sum == 0) {
      this.budgetItems.forEach(t => {
        this.sum += t.totalAmnt;
      });

      return this.sum;
    }
  }

  setProgress(budgetAmnt, budgetCat) {
    this.progress = 0;
    this.expenseItems.forEach(e => {
      if (e.type == budgetCat) {
        this.progress = this.progress + (e.amount / budgetAmnt) * 100;
      }
    });

    let rounded = Math.round(this.progress);
    return `${rounded}%`;
  }

  getBudgetSpent(budgetCat) {
    this.budgetSum = 0;
    this.expenseItems.forEach(e => {
      if (e.type == budgetCat) {
        this.budgetSum = this.budgetSum + e.amount;
      }
    });

    return this.budgetSum;
  }

}
