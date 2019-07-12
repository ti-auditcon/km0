import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAddPiecePage } from './modal-add-piece.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddPiecePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAddPiecePage]
})
export class ModalAddPiecePageModule {}
