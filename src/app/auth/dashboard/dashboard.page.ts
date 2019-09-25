
//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll,ToastController  } from '@ionic/angular';



import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {

  

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  profile:any = '';
 
  events:any = '';
  orders:any = '';
  eventsMeta:any = '';
  ordersMeta:any = '';

  httpOptions:any;
  hasNotifications:boolean;
  public page = 1;

  constructor(
    private router: Router,
    private storage: Storage,
    private http:HttpClient,
    public toastController: ToastController

  ) { }


  ngOnInit() {
      console.log('Initializing HomePage');



      // PushNotifications.addListener('registrationError', 
      //   (error: any) => {
      //     alert('Error on registration: ' + JSON.stringify(error));
      //   }
      // );

      // PushNotifications.addListener('pushNotificationReceived', 
      //   (notification: PushNotification) => {
      //     alert('Push received: ' + JSON.stringify(notification));
      //   }
      // );

      // PushNotifications.addListener('pushNotificationActionPerformed', 
      //   (notification: PushNotificationActionPerformed) => {
      //     alert('Push action performed: ' + JSON.stringify(notification));
      //   }
      // );
  }


  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentToast(title:any,message:any) {
    const toast = await this.toastController.create({
      header: title,
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidEnter() {
    //console.log(this.hasNotifications);
    this.page = 1
    this.storage.get('auth-token').then((value) => {
      
      let Bearer = value;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        
        PushNotifications.register();

        PushNotifications.addListener('registration', 
          (token: PushNotificationToken) => {
            console.log('Push registration success, token: ' + token.value);
            this.http.get(SERVER_URL+"api/fcm/token/"+token.value, this.httpOptions)
            .subscribe((result: any) => {
                 console.log('success fcm token 200:'+JSON.stringify(result));
                },
                (err) => {
                  console.log('error refrersh 401:'+JSON.stringify(err));
                }
              );
          }
        );

      PushNotifications.addListener('pushNotificationReceived', 
        (notification: PushNotification) => {
         // alert('Push received: ' + JSON.stringify(notification));
         this.presentToast(notification.title,notification.body);
        }
      );

        this.http.get(SERVER_URL+"api/profile", this.httpOptions)
        .subscribe((result: any) => {
          
          this.profile = result.data;
          console.log(result.data);
          this.storage.set('discount',result.data.discount)

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
