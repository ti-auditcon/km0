
//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalImagePage } from './modal-image/modal-image.page';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  event:any = '';
  httpOptions:any;

  images = [
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
  ]

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(
    public activatedRoute: ActivatedRoute,
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
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"api/events/"+id, this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          
          this.event = result.data;
          
        });


    });
  }

  goToPublicProfile() {
    this.router.navigate(['/public-profile']);
  }

  openPreview(img) {
    this.modalController.create({
      component: ModalImagePage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }

  // async openImage() {
  //   const modal = await this.modalController.create({
  //     component: ModalImagePage
  //   });
  //   return await modal.present();
  // }

}
