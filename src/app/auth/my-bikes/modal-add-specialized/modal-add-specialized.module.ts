import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAddSpecializedPage } from './modal-add-specialized.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddSpecializedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAddSpecializedPage]
})
export class ModalAddSpecializedPageModule {}
