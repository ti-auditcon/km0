
//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit, ViewChild   } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalImagePage } from './modal-image/modal-image.page';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  event:any = '';
  users:any = '';
  images:any = '';
  imagesPage:any = 1;
  canReserve:any = false;
  httpOptions:any;



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
    this.imagesPage = 1
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
          if(!this.event.rels.auth.reserved){
            this.canReserve = true;
          }
          
        });
        //users
        this.http.get(SERVER_URL+"api/events/"+id+"/users", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          
          this.users = result.data;
          
        });
        //images
        this.http.get(SERVER_URL+"api/events/"+id+"/images?per_page=6&page="+this.imagesPage, this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          
          this.images = result.data;
          
        });

    });
  }

  loadMoreImages(infiniteScrollEvent){
    console.log('entre');
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(SERVER_URL+"api/events/"+id+"/images?per_page=6&page="+this.imagesPage, this.httpOptions)
        .subscribe((result: any) => {
          this.images = this.images.concat(result.data);
          if(this.imagesPage < result.meta.pagination.total_pages ){
            this.imagesPage++;
            infiniteScrollEvent.target.complete();
          } else {
            console.log('no hay mas');
            infiniteScrollEvent.target.disabled = true;
          }

        },
        err => {
          console.log('error eventos');
        });
  }

  //crear reserva
  attach() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(SERVER_URL+"api/events/"+id+"/attach", this.httpOptions)
        .subscribe((result: any) => {
          console.log('attach');
          this.ionViewDidEnter();
          this.canReserve = false;
        },
        err => {
          console.log('error reservar');
        });
    }
  
  //eliminar reserva
  detach() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(SERVER_URL+"api/events/"+id+"/detach", this.httpOptions)
        .subscribe((result: any) => {
          console.log('detach');
          this.ionViewDidEnter();
          this.canReserve = true;
        },
        err => {
          console.log('error ceder');
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
