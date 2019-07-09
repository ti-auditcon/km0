import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StepReadyPage } from './step-ready.page';
import { StatusProcessModule } from '../../components/status-process/status-process.module';

const routes: Routes = [
  {
    path: '',
    component: StepReadyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusProcessModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StepReadyPage]
})
export class StepReadyPageModule {}
