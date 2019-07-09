import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StepOnDiagnosticPage } from './step-on-diagnostic.page';
import { StatusProcessModule } from '../../components/status-process/status-process.module';

const routes: Routes = [
  {
    path: '',
    component: StepOnDiagnosticPage
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
  declarations: [StepOnDiagnosticPage]
})
export class StepOnDiagnosticPageModule {}
