import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAddBikeProfilePage } from './modal-add-bike-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddBikeProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAddBikeProfilePage]
})
export class ModalAddBikeProfilePageModule {}
