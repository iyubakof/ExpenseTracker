import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/model/income';
import { IncomeService } from 'src/app/service/income.service';
import { Router, NavigationEnd } from '@angular/router';
//implement dialog box to warn they are about to delete
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeItems: Income[];
  response: any;
  error: string;
  sum: number = 0;
  add: boolean;
  title: string;

  constructor(private incomeService: IncomeService, private route: Router, private loginService: LoginService) {

  }
  ngOnInit() {
    this.fetchIncome();
  }

  fetchIncome() {
    this.incomeService.findAll(parseInt(sessionStorage.getItem('id')), 9).subscribe(data => {
      this.incomeItems = data;
    },
      error => this.error = error);
  }

  totalIncome(tIn: number) {
    if (tIn == 0) {
      this.incomeItems.forEach(t => {
        tIn += t.amount;
      });

      return tIn;
    }

    // this.sum = 0;
  }

  update(income: Income, i) {
    this.route.navigateByUrl('incomeform', {
      state:
      {
        add: false,
        title: 'Edit Income',
        id: income.id,
        type: income.type,
        name: income.name,
        amount: income.amount,
        date: income.date
      }
    });

  }

  delete(id: number) {
    let yes = confirm("You are about to delete this record.\nDo you wish to proceed?");

    if (yes) {
      //delete
      this.incomeService.deleteIncome(parseInt(sessionStorage.getItem('id')), id).subscribe(data => {
        //redirect to incomes
        this.ngOnInit();
      });
    }
  }
}
