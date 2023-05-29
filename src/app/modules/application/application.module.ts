import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BankComponent } from './pages/bank/bank.component';
import { BankFormComponent } from './pages/bank/bank-form/bank-form.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [HomeComponent, BankComponent, BankFormComponent],
  imports: [CommonModule, ApplicationRoutingModule, CoreModule, SharedModule],
})
export class ApplicationModule {}
