
//env
import { environment, SERVER_URL} from '../../../environments/environment';

import { Component, NgZone } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { WebviewOverlay } from '@teamhive/capacitor-webview-overlay';
import { Plugins } from '@capacitor/core';
import { Router,ActivatedRoute  } from '@angular/router';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { browser } from 'protractor';

const { Browser } = Plugins;

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.scss'],
})
export class FlowPage {
  loading = true;
  pageLoading = false;
  progress: number;
  webview: WebviewOverlay;
  url:string = '';
  id:any ='';


  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private router: Router,
    private storage: Storage,
    private http:HttpClient,
    private route: ActivatedRoute,
    public iap: InAppBrowser,
    private zone: NgZone

  ) { }

  ionViewDidEnter() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.storage.get('auth-token').then((value) => {

        let Bearer = value;

        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '+ Bearer//updated
          })};

          this.http.get(SERVER_URL+"api/orders/"+this.id+"/payflow", httpOptions)
          .subscribe((result: any) => {
            console.log(result.url);


            if(this.platform.is('android')){
                const browser = this.iap.create(result.url, '_blank', "hideurlbar=yes,footer=no,toolbarcolor=#141A29,navigationbuttoncolor=#D3D5E0,closebuttoncaption=cerrar,closebuttoncolor=#D3D5E0");
                browser.on('loadstop').subscribe((event) => {
                  console.log('cargo android');
                });
                browser.on('exit').subscribe((event) => {
                  this.zone.run(async () => {
                    await this.router.navigate(['/orders/'+this.id+'']);
                  });
                  browser.close();
                });
            }
            if(this.platform.is('ios')){
                const browser = this.iap.create(result.url, '_blank', "toolbarposition=top,closebuttoncaption=Cerrar,toolbarcolor=#141A29,closebuttoncolor=#D3D5E0,navigationbuttoncolor=#D3D5E0");
                browser.on('loadstop').subscribe((event) => {
                  console.log('cargo ios');
                });
                browser.on('exit').subscribe((event) => {
                  this.zone.run(async () => {
                    await this.router.navigate(['/orders/'+this.id+'']);
                  });
                  browser.close();
                });
            }




          });
      });
    });


  }

}
