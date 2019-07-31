import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAddBikeProfilePage } from './modal-add-bike-profile.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild(routes),
    FormsModule,    //added here too
    ReactiveFormsModule //added here too
  ],
  declarations: [ModalAddBikeProfilePage]
})
export class ModalAddBikeProfilePageModule {}
