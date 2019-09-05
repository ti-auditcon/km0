import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StepPayPage } from './step-pay.page';
import { BookingProcessModule } from '../../components/booking-process/booking-process.module';

const routes: Routes = [
  {
    path: '',
    component: StepPayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingProcessModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StepPayPage]
})
export class StepPayPageModule {}
