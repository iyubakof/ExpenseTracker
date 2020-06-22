import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor() { }

  months: string[] = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December"];

  getMonthValue(m: number){
    // console.log(this.months[m]);
    return this.months[m];
  }
}
