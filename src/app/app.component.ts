//env
import { environment, SERVER_URL} from '../environments/environment';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  profile:any = '';
  httpOptions:any;

  public appPages = [
    {
      title: 'Inicio',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Reservar Servicios',
      url: '/step-bike',
      icon: 'bicycle'
    },
    {
      title: 'Eventos',
      url: '/events',
      icon: 'calendar'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private storage: Storage,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.initializeApp();
  }

  ngOnInit() {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(()=>{

      },1000);

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {

          this.storage.get('auth-token').then((value) => {
            let Bearer = value;
            this.httpOptions = {
              headers: new HttpHeaders({
                'Authorization': 'Bearer '+ Bearer//updated
              })};
              this.http.get(SERVER_URL+"api/profile", this.httpOptions)
              .subscribe((result: any) => {
                this.profile = result.data;
                if(this.profile.hasNotifications == 1){
                  this.storage.set('has_notification',true);

                } else {
                  this.storage.set('has_notification',false);

                }
              });
          });

          this.router.navigate(['dashboard']);


        } else {
          this.router.navigate(['login']);

        }
      });
    });
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }
}
