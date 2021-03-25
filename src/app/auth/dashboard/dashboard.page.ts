
//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll,ToastController  } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { FCM } from "capacitor-fcm";
//models 
import { User } from '../../models/user.model';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed 
} from '@capacitor/core';

const { PushNotifications } = Plugins;
const fcm = new FCM();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  session: any;
  profile:any = '';
  events:any = '';
  orders:any = '';
  diagnosed:any = '';
  eventsMeta:any = '';
  ordersMeta:any = '';
  httpOptions:any;
  hasNotifications:boolean;
  public page = 1;


  notifications: PushNotification[] = [];
  //
  // move to fcm demo
  topicName = 'super-awesome-topic';
  remoteToken: string;

  constructor(
    private router: Router,
    private storage: Storage,
    private http:HttpClient,
    private platform: Platform,
    public toastController: ToastController

  ) { }

  ngOnInit() {

  }



  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentToast(title:any,message:any,order:any) {
    const toast = await this.toastController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Ver',
          handler: () => {
            console.log('me fui');
            this.router.navigate(['/orders/'+order]);
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    toast.present();
  }

  async diagnosedToast(id:any) {
    const toast = await this.toastController.create({
      header: 'Diagnostico actualizado',
      message: 'la orden #'+id+' necesita tu aprobación.',
      buttons: [
        {
          text: 'Ver',
          handler: () => {
            console.log('me fui');
            this.router.navigate(['/orders/'+id]);
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    toast.present();
  }

  //ionic enter
  ionViewDidEnter() {
    //console.log(this.hasNotifications);
    this.page = 1
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let token:any; 

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        console.log('entre ionenter');
        PushNotifications.addListener('registration', data => {
          console.log('hola este es mi fcm: '+data.value);
          token = data.value;
        });
        PushNotifications.register().then(() => console.log('registrado'));
        PushNotifications.addListener(
          'pushNotificationReceived',
          (notification: PushNotification) => {
            console.log('notification ' + JSON.stringify(notification));
            console.log('order');
            console.log(notification.data.moredata);
            this.notifications.push(notification);
            this.presentToast(notification.title,notification.body,notification.data.moredata);
          }
        );

        fcm
        .getToken()
        .then(result => {
          let remoteToken = result.token;
          console.log('ahora si po puto: '+remoteToken);
          this.http.get(SERVER_URL+"api/fcm/token/"+remoteToken, this.httpOptions)
          .subscribe((result: any) => {
                console.log('success fcm token 200: '+JSON.stringify(result));
              },
              (err) => {
                console.log('error refrersh 401: '+JSON.stringify(err));
              }
            );
        })
        .catch(err => {
          console.log('que chucha!!!!');
          console.log(err);
        });

        this.http.get(SERVER_URL+"api/profile", this.httpOptions)
        .subscribe((result: any) => {

          this.profile = result.data;
          console.log(result.data);
          var userModel:User;

          userModel = new User();
          userModel.id = result.data.id;
          userModel.name = result.data.fullName;
          userModel.avatar = result.data.avatar;
          userModel.city = result.data.city;
      
          console.log(userModel);
          this.storage.set('user',userModel);
          this.storage.set('discount',result.data.discount);

        });

        this.http.get(SERVER_URL+"api/events/next?per_page=3&page="+this.page, this.httpOptions)
        .subscribe((result: any) => {

            this.events = result.data;
            this.page++;

        });

        this.http.get(SERVER_URL+"api/orders", this.httpOptions)
        .subscribe((result: any) => {
            this.orders = result.data;
            console.log(result.data);
            this.diagnosed = result.data.filter(order => order.status.id == 4);

            this.diagnosed.forEach(element => {
              console.log(element.id);
              this.diagnosedToast(element.id); 
          });

        });

        this.http.get(SERVER_URL+"api/profile/notifications/has", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.hasNotifications = result;
        });



    });
  }

  loadMoreEvents(infiniteScrollEvent){
    console.log('entre');
    this.http.get(SERVER_URL+"api/events/next?per_page=3&page="+this.page, this.httpOptions)
        .subscribe((result: any) => {
          console.log('mas eventos');
          console.log('page:'+this.page);
          this.events = this.events.concat(result.data);
          if(this.page < result.meta.pagination.total_pages ){
            this.page++;
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

  goToBooking(){
    this.router.navigate(['/step-bike']);
  }
  goToOrder(id:number){
    this.router.navigate(['/orders/'+id]);
  }
  goToEvents() {
    this.router.navigate(['/events']);
  }
  goToEvent(id:number) {
    this.router.navigate(['/events/'+id]);
  }

}
