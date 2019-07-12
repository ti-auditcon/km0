import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalChangeOfficePage } from './modal-change-office.page';

const routes: Routes = [
  {
    path: '',
    component: ModalChangeOfficePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalChangeOfficePage]
})
export class ModalChangeOfficePageModule {}
