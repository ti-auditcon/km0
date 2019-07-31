//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

import { ModalAddSpecializedPage } from '../modal-add-specialized/modal-add-specialized.page';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-add-bike-profile',
  templateUrl: './modal-add-bike-profile.page.html',
  styleUrls: ['./modal-add-bike-profile.page.scss'],
})
export class ModalAddBikeProfilePage implements OnInit {

  private bikeForm : FormGroup;

  selSpecialized:boolean = false;
  selOther:boolean = false;
  specializeds:any = '';
  httpOptions:any = '';




  constructor(
    private router: Router,
    private modalController: ModalController,
    private storage: Storage,
    private http:HttpClient,
    private formBuilder: FormBuilder

  ) { 
    this.bikeForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: [''],
      year: ['',Validators.pattern("^[0-9]*$")],
      type: [''],
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer,//updated
          'Content-Type': 'application/json', //updated
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

    console.log(this.bikeForm.value);
    this.storage.get('auth-token').then((value) => {
      let data=JSON.stringify({
        brand: this.bikeForm.value.brand,
        model: this.bikeForm.value.model,
        year: this.bikeForm.value.year,
        type: this.bikeForm.value.type,
      });
      console.log(data);

        this.http.post(SERVER_URL+"api/bikes",data, this.httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.modalController.dismiss(true);
        });

    });

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
