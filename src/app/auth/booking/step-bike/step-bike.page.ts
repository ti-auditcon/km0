//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//modals
import { ModalController } from '@ionic/angular';
import { ModalAddBikePage } from './modal-add-bike/modal-add-bike.page';
import { ModalAddPiecePage } from './modal-add-piece/modal-add-piece.page';
import { ModalChangeOfficePage } from './modal-change-office/modal-change-office.page';
//models
import { Bike } from '../../../models/bike.model';

@Component({
  selector: 'app-step-bike',
  templateUrl: './step-bike.page.html',
  styleUrls: ['./step-bike.page.scss'],
})
export class StepBikePage implements OnInit {
  //public bike: Bike;
  bikes:any = '';
  bikeSelected:Bike;
  
  httpOptions:any;
  bikesMeta:any = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"api/profile/bikes", this.httpOptions)
        .subscribe((result: any) => {
          this.bikes = result.data;
          console.log(this.bikes);
          this.bikesMeta = result.meta;
          console.log(this.bikesMeta);
        });

    });
  }

  async addBicicleModal() {
    const modal = await this.modalController.create({
      component: ModalAddBikePage
    });
    return await modal.present();
  }

  async addPieceModal() {
    const modal = await this.modalController.create({
      component: ModalAddPiecePage
    });
    return await modal.present();
  }

  async changeOfficeModal() {
    const modal = await this.modalController.create({
      component: ModalChangeOfficePage
    });
    return await modal.present();
  }

  goToService(bike:any){
    var bikeModel:Bike;

    bikeModel = new Bike();
    bikeModel.id = bike.id;
    bikeModel.brand = bike.brand;
    bikeModel.model = bike.model;

    console.log(bikeModel);
    this.storage.set('bike',bikeModel)
    this.router.navigate(['/step-service']);
  }

}
