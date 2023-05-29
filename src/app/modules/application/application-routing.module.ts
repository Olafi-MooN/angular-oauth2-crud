import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BankComponent } from './pages/bank/bank.component';
import { BankFormComponent } from './pages/bank/bank-form/bank-form.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'bank',
    component: BankComponent,
  },
  {
    path: 'bank/form',
    component: BankFormComponent,
  },
  {
    path: 'bank/form/:id',
    component: BankFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
