
//env
import { environment, SERVER_URL} from '../../../environments/environment';

import { Component, OnInit, ViewChild, ElementRef , OnDestroy, NgZone } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { WebviewOverlay } from '@teamhive/capacitor-webview-overlay';
import { Plugins } from '@capacitor/core';
import { Router,ActivatedRoute  } from '@angular/router';
const { Browser } = Plugins;

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.scss'],
})
export class FlowPage implements OnInit , OnDestroy {
  loading = true;
  pageLoading = false;
  progress: number;
  webview: WebviewOverlay;
  url:string = '';
  id:any ='';
  @ViewChild('webview') webviewEl: ElementRef;

  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private zone: NgZone,
    private storage: Storage,
    private http:HttpClient,
    private route: ActivatedRoute

  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("order");
      this.storage.get('auth-token').then((value) => {

        let Bearer = value;

        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '+ Bearer//updated
          })};

          this.http.get(SERVER_URL+"api/orders/"+this.id+"/payflow", httpOptions)
          .subscribe((result: any) => {
            console.log(result.url);
            this.createWebview(result.url);
          });
      });
    });

    

    const menus = await this.menuCtrl.getMenus();
    for (const menu of menus) {
        menu.addEventListener('ionWillOpen', () => {
            if (this.webview) {
                this.webview.toggleSnapshot(true);
            }
        });
        menu.addEventListener('ionDidClose', () => {
            if (this.webview) {
                this.webview.toggleSnapshot(false);
            }
        });
    }
  }

  ngOnDestroy() {
      if (this.platform.is('capacitor')) {
          this.webview.close();
      }
  }

  get hasWebview() {
      return !!this.webview;
  }

  async createWebview(url:string) {
      if (this.platform.is('capacitor')) {
          this.loading = true;
          this.webview = new WebviewOverlay();
          this.webview.open({
              url: url,
              element: this.webviewEl.nativeElement
          });

          this.webview.onPageLoaded(() => {
              this.zone.run(() => {
                  this.loading = false;
                  setTimeout(() => {
                      this.pageLoading = false;
                      setTimeout(() => {
                          this.progress = 0;
                      }, 200);
                  }, 500);
              });
          });

          this.webview.onProgress((progress) => {
              this.zone.run(() => {
                  this.progress = progress.value;
                  if (progress.value < 1) {
                      this.pageLoading = true;
                  }
              });
          });

          this.webview.handleNavigation((event) => {
              if (event.newWindow) {
                  event.complete(false);
                  window.open(event.url);
              } else {
                  event.complete(true);
              }
          });
      }
  }


  async destroyWebview() {
      if (this.platform.is('capacitor')) {
          this.webview.close();
          this.loading = false;
          this.webview = undefined;
      }
  }

  goBack() {
      if (this.platform.is('capacitor')) {
          this.webview.goBack();
      }
  }

  goForward() {
      if (this.platform.is('capacitor')) {
          this.webview.goForward();
      }
  }

  reload() {
      if (this.platform.is('capacitor')) {
          this.webview.reload();
      }
  }

}
