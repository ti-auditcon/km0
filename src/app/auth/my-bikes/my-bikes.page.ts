//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalAddBikeProfilePage } from './modal-add-bike-profile/modal-add-bike-profile.page';

@Component({
  selector: 'app-my-bikes',
  templateUrl: './my-bikes.page.html',
  styleUrls: ['./my-bikes.page.scss'],
})
export class MyBikesPage implements OnInit {
  profile:any = '';
  bikes:any = '';
  httpOptions:any;

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

        this.http.get(SERVER_URL+"api/profile", this.httpOptions)
        .subscribe((result: any) => {
          this.profile = result.data;
          //bicicletas
          this.http.get(this.profile.rels.bikes.href, this.httpOptions)
          .subscribe((result: any) => {
            console.log(result.data);
            this.bikes = result.data;

          });
        });

    });
  }

  goToBikeDetail(id:number){
    this.router.navigate(['/profile/bikes/'+id]);
  }

  async addBike() {
    const modal = await this.modalController.create({
      component: ModalAddBikeProfilePage
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if(data){
      console.log('cargar nuevamente')
     this.ionViewDidEnter();
    } else {
      console.log('no hacer nada')
    }
  }

}
