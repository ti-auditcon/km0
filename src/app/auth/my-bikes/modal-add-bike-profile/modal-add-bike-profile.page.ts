//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

import { ModalAddSpecializedPage } from '../modal-add-specialized/modal-add-specialized.page';

@Component({
  selector: 'app-modal-add-bike-profile',
  templateUrl: './modal-add-bike-profile.page.html',
  styleUrls: ['./modal-add-bike-profile.page.scss'],
})
export class ModalAddBikeProfilePage implements OnInit {

  selSpecialized:boolean = false;
  selOther:boolean = false;
  specializeds:any = '';
  httpOptions:any = '';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"api/specializeds?all=true", this.httpOptions)
        .subscribe((result: any) => {
          this.specializeds = result.data;
          console.log(this.specializeds );
        });

    });
  }

  onBrandChange($event){

    if($event.detail.value == "true"){

      this.selOther = false;
      this.selectSpecialized();
    } else {

      this.selOther = true;
    }

  }

  storeBike(){

  }
  dismiss() {
    this.modalController.dismiss(false);
  }

  async selectSpecialized() {
    const  modal = await this.modalController.create({
      component: ModalAddSpecializedPage
    });
    await modal.present();    

    const { data } = await modal.onDidDismiss();
    if(data){
      console.log('salir')
      this.modalController.dismiss(true);
    } else {
      console.log('error')
    }
    

  }
}