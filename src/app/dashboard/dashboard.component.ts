import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../service/income.service';
import { Income } from '../model/income';
import { Expense } from '../model/expense';
import { Budget } from '../model/budget';
import { ExpenseService } from '../service/expense.service';
import { BudgetService } from '../service/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: string;
  incomeItems: Income[];
  expenseItems: Expense[];
  budgetItems: Budget[];
  overBalance: boolean = false;
  underBudget: boolean = true;
  budgetStatus: string;
  progress = 0;
  d = new Date();
  m = this.d.getMonth() + 1;

  // public chartLabels = [];
  // public chartData=[];
  // public chartType = "pie";
  // counter:number = 0;

  constructor(private incomeServ: IncomeService, private expenseServ: ExpenseService, private budgetServ: BudgetService, private router: Router) {
    //user fullname
    this.user = sessionStorage.getItem('fullname');
    //income items
    this.incomeServ.findAll(parseInt(sessionStorage.getItem('id')), this.m).subscribe(i => {
      this.incomeItems = i;
    },
      error => {
        console.log(error);
      });
    //expense items
    this.expenseServ.findAll(parseInt(sessionStorage.getItem('id')), this.m).subscribe(e => {
      this.expenseItems = e;
    });
    //budget items
    this.budgetServ.findBudgetItems(parseInt(sessionStorage.getItem('id'))).subscribe(b => {
      this.budgetItems = b;
    });

    if (this.budgetItems == undefined) {
      this.budgetItems = [
        {
          id: null,
          budgetId: 1,
          userId: parseInt(sessionStorage.getItem('id')),
          totalAmnt: 1300.00,
          category: 'Housing',
          withinBudget: true,
          month: this.getCurrMonth()
        },
        {
          id: null,
          budgetId: 1,
          userId: parseInt(sessionStorage.getItem('id')),
          totalAmnt: 200.00,
          category: 'Bills',
          withinBudget: true,
          month: this.getCurrMonth()
        },
        {
          id: null,
          budgetId: 1,
          userId: parseInt(sessionStorage.getItem('id')),
          totalAmnt: 300.00,
          category: 'Food/Dining',
          withinBudget: true,
          month: this.getCurrMonth()
        },
        {
          id: null,
          budgetId: 1,
          userId: parseInt(sessionStorage.getItem('id')),
          totalAmnt: 100.00,
          category: 'Transportation',
          withinBudget: true,
          month: this.getCurrMonth()
        },
        {
          id: null,
          budgetId: 1,
          userId: parseInt(sessionStorage.getItem('id')),
          totalAmnt: 15.00,
          category: 'Entertainment',
          withinBudget: true,
          month: this.getCurrMonth()
        },
        {
          id: null,
          budgetId: 1,
          userId: parseInt(sessionStorage.getItem('id')),
          totalAmnt: 60.00,
          category: 'Healthcare',
          withinBudget: true,
          month: this.getCurrMonth()
        },
        {
          id: null,
          budgetId: 1,
          userId: parseInt(sessionStorage.getItem('id')),
          totalAmnt: 100.00,
          category: 'Misc',
          withinBudget: true,
          month: this.getCurrMonth()
        }
      ];

      this.budgetItems.map(item => {
        this.budgetServ.saveBudgetItem(item.userId, item);
      });
    }
  }

  ngOnInit() {
    // let total = this.getExpenseTotal(0);

    // this.expenseItems.forEach(e => {
    //   this.chartData[this.counter]= ((e.amount/total)*100);
    //   this.chartLabels[this.counter] = e.type;
    //   this.counter++;
    // });

    // console.log(this.chartData);
  }

  getCurrMonth() {
    var months: string[] = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December"];

    let currMonth = months[this.d.getMonth()];

    return currMonth;
  }

  getIncomeTotal(tIn: number) {
    if (tIn == 0) {
      this.incomeItems.forEach(ti => {
        tIn += ti.amount;
      });

      return tIn;
    }
  }

  getExpenseTotal(tEx: number) {
    if (tEx == 0) {
      this.expenseItems.forEach(te => {
        tEx += te.amount;
      });

      return tEx;
    }
  }

  getBudgetTotal(tBud: number) {
    if (tBud == 0) {
      this.budgetItems.forEach(tb => {
        tBud += tb.totalAmnt;
      });

      return tBud;
    }
  }

  withinBudget() {
    let budBalance = this.getBudgetTotal(0) - this.getExpenseTotal(0);

    if (budBalance > 0) {
      this.underBudget = false;
      this.budgetStatus = "within";
    }
    else {
      this.underBudget = true;
      this.budgetStatus = "over";
    }

    return this.budgetStatus;

  }

  getBalance() {
    let balance = this.getIncomeTotal(0) - this.getExpenseTotal(0);

    if (balance < 0) {
      this.overBalance = true;
    }
    else {
      this.overBalance = false;
    }

    return balance;
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

  goTo(page: string) {
    this.router.navigateByUrl(`${page}`);
  }

}
