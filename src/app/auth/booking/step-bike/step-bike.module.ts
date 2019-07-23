import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StepBikePage } from './step-bike.page';
import { BookingProcessModule } from '../../components/booking-process/booking-process.module';



const routes: Routes = [
  {
    path: '',
    component: StepBikePage
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
  declarations: [StepBikePage]
})
export class StepBikePageModule {}
