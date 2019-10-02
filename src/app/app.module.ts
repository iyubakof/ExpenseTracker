import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import{ StorageServiceModule } from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { UsersComponent } from './component/users/users.component';
import { BudgetComponent } from './component/budget/budget.component';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { IncomeFormComponent } from './component/income-form/income-form.component';
import { LoginComponent } from './component/login/login.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseFormComponent } from './component/expense-form/expense-form.component';
import { ChartsModule } from 'ng2-charts';

const routes:Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  {path: 'budget', component: BudgetComponent, canActivate: [AuthGuard]},
  {path: 'income', component: IncomeComponent, canActivate: [AuthGuard]},
  {path: 'expense', component: ExpenseComponent, canActivate: [AuthGuard]},
  {path: 'incomeform', component: IncomeFormComponent, canActivate: [AuthGuard]},
  {path: 'expenseform', component: ExpenseFormComponent, canActivate: [AuthGuard]},
  {path: 'backincome', redirectTo: 'income', canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BudgetComponent,
    IncomeComponent,
    ExpenseComponent,
    IncomeFormComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    ExpenseFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    ChartsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
