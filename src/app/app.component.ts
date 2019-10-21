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

import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  profile:User ;
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
    this.profile = new User; 
    this.profile.id = 0;
    this.profile.name = '';
    this.profile.avatar = '';
    this.profile.city = '';
  }

  ngOnInit() {

  }

  menuOpened(){
    this.storage.get('user').then((value) => {
      this.profile = value;
      console.log(this.profile);
    });
    console.log('abri el menu');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(()=>{

      },1000);

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {

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
