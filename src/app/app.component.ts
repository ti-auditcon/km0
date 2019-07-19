import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
    private authenticationService: AuthenticationService,
  ) {
    this.initializeApp();
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
