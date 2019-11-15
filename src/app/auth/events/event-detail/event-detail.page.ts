//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit, ViewChild   } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController  } from '@ionic/angular';
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

  @ViewChild(IonInfiniteScroll, {read: IonInfiniteScroll}) public infiniteScroll: IonInfiniteScroll;


  event:any = '';
  users:any = '';
  usersMeta: any;
  usersPage: any = 1;
  images:any = '';
  imagesPage:any = 1;
  reserved:any = false;
  closed:any = true;
  httpOptions:any;
  imagesMeta: any;
  reActiveInfinite: any;



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
    private http:HttpClient,
    public toastController: ToastController
  ) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    if(this.reActiveInfinite){
     this.reActiveInfinite.target.disabled = false;
    }
    this.closed = true;
    this.imagesPage = 1;
    this.usersPage = 1;
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
          this.closed = this.event.closed;

        });
        //users
        this.http.get(SERVER_URL+"api/events/"+id+"/users?per_page=6&page="+this.usersPage, this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);

          this.users = result.data;
          this.usersMeta = result.meta;
          this.usersPage++;

        });
        //servicios
        this.http.get(SERVER_URL+"api/events/"+id+"/images?per_page=6&page="+this.imagesPage, this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);

          this.images = result.data;
          this.imagesMeta = result.meta;
          this.imagesPage++;

        });

    });
  }

  loadMoreUsers(infiniteScrollEvent){
    console.log('entre users');
    this.reActiveInfinite = infiniteScrollEvent;

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(SERVER_URL+"api/events/"+id+"/users?per_page=6&page="+this.usersPage, this.httpOptions)
        .subscribe((result: any) => {
          this.users = this.users.concat(result.data);
          console.log("total pages: "+result.meta.pagination.total_pages);
          if(this.usersPage <= result.meta.pagination.total_pages ){
            this.usersPage++;
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

  loadMoreImages(infiniteScrollEvent){
    console.log('entre images');


    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(SERVER_URL+"api/events/"+id+"/images?per_page=6&page="+this.imagesPage, this.httpOptions)
        .subscribe((result: any) => {
          this.images = this.images.concat(result.data);
          console.log("total pages: "+result.meta.pagination.total_pages);
          if(this.imagesPage <= result.meta.pagination.total_pages ){
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
         
          this.reserved = false;
          this.ionViewDidEnter();
          
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
         
          this.reserved = true;
          this.ionViewDidEnter();
          
        },
        err => {
          console.log('error ceder');
        });
    }

  goToPublicProfile(id:any) {
    this.router.navigate(['/public-profile/'+id+'/']);
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

  async reserveToast() {
    const toast = await this.toastController.create({
      message: 'Cupo Reservado',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async leaveToast() {
    const toast = await this.toastController.create({
      message: 'Cupo Cedido',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  // async openImage() {
  //   const modal = await this.modalController.create({
  //     component: ModalImagePage
  //   });
  //   return await modal.present();
  // }

}
