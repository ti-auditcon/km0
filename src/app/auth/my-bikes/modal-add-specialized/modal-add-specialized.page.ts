//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ModalController, NavController  } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-add-specialized',
  templateUrl: './modal-add-specialized.page.html',
  styleUrls: ['./modal-add-specialized.page.scss'],
})
export class ModalAddSpecializedPage implements OnInit {

  hightlightStatus: Array<boolean> = [];
  httpOptions:any = '';
  spOriginal:any =''
  spFiltered:any =''
  bikeId:any ="";

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    private storage: Storage,
    private http:HttpClient,
    private sanitizer: DomSanitizer
  ) { }  

  ngOnInit() {
  }
  check(i:any,bikeId:any) {
    console.log(bikeId);
    this.bikeId = bikeId;

    this.hightlightStatus = [];
    this.hightlightStatus[i] = !this.hightlightStatus[i];

  }

  dismiss() {
    this.modalController.dismiss(false);
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
          this.spOriginal = result.data;
          console.log(this.spOriginal );
          this.spFiltered = this.spOriginal
        });

    });
  }

  onSearchChange(searchValue: string): void {  
    this.hightlightStatus = [];
    console.log(searchValue);
    this.spFiltered = this.spOriginal.filter((items) => items.model.toLowerCase().includes(searchValue.toLowerCase()));
  }

  addBike() {  
    if(this.bikeId == ""){
      console.log('error');

    } else {
      this.storage.get('auth-token').then((value) => {

        this.http.get(SERVER_URL+"api/specializeds/"+this.bikeId+"/assign", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.modalController.dismiss(true);
        });

      });
    }

  }

}
