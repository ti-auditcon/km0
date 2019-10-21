//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPublicImagePage } from './modal-public-image/modal-public-image.page';

import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
})
export class PublicProfilePage implements OnInit {

  profile:any = '';
  events:any = '';
  httpOptions:any;


  constructor(
    private modalController: ModalController,
    private router: Router,
    private storage: Storage,
    public activatedRoute: ActivatedRoute,
    private http:HttpClient,

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      let Bearer = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        this.http.get(SERVER_URL+"api/users/"+id, this.httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.profile = result.data;

        });

        this.http.get(SERVER_URL+"api/users/"+id+"/events", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.events = result.data;

        });

    });
  }

  goEvent(id:any){
    this.router.navigate(['/events/'+id+'/']);
  }


  async viewPhoto(){
    const modal = await this.modalController.create({
      component: ModalPublicImagePage
    });
    return await modal.present();
  }

}
