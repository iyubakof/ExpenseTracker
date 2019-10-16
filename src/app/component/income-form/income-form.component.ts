import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { Income } from 'src/app/model/income';
import { IncomeService } from 'src/app/service/income.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  types = [
    "Checking",
    "Cash"
  ];

  title: string;
  add: boolean;
  pipe = new DatePipe('en-US');

  newIncome: Income = {
    id: null,
    userId: null,
    type: null,
    name: null,
    amount: null,
    date: null
  }

  constructor(private router: Router, private incomeService: IncomeService) {

  }

  ngOnInit() {
    this.add = history.state.add;
    this.title = history.state.title;

    if (this.add == false) {
      this.newIncome.id = history.state.id;
      this.newIncome.type = history.state.type;
      this.newIncome.name = history.state.name;
      this.newIncome.amount = history.state.amount;
      this.newIncome.date = this.pipe.transform(history.state.date, 'yyyy-MM-dd');
    }
  }

  addIncome() {
    this.incomeService.saveIncome(parseInt(sessionStorage.getItem('id')), this.newIncome).subscribe(income => {
      //redirect to incomes
      this.router.navigate(['../income']);
    });
  }

  editIncome() {
    this.incomeService.updateIncome(parseInt(sessionStorage.getItem('id')), this.newIncome).subscribe(income => {
      //redirect to incomes
      this.router.navigate(['../income']);
    });
  }

  onSubmit(form: NgForm) {
    if (this.add == true) {
      this.addIncome();
    }
    else {
      this.editIncome();
    }
  }

}
