//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit, ViewChild   } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { IonInfiniteScroll } from '@ionic/angular';

import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-step-service',
  templateUrl: './step-service.page.html',
  styleUrls: ['./step-service.page.scss'],
})
export class StepServicePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  hightlightStatus: Array<boolean> = [];
  item:any;
  httpOptions:any;
  services:any = '';
  hasSelectedServices: boolean;
  hasNotifications:boolean;

  servicesPage = 1;
  servicesMeta:any = '';

  clickedServices:Array<number> = [];



  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
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

        this.http.get(SERVER_URL+"api/services?per_page=6&page="+this.servicesPage, this.httpOptions)
        .subscribe((result: any) => {
          this.services = result.data;
          console.log(this.services);
          this.servicesMeta = result.meta;
          this.servicesPage++;
          console.log(this.servicesMeta);

        });

        this.http.get(SERVER_URL+"api/profile/notifications/has", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.hasNotifications = result;
        });

    });
  }

  loadMoreImages(infiniteScrollEvent){
    console.log('entre');
    console.log(this.servicesMeta);

    this.http.get(SERVER_URL+"api/services?per_page=6&page="+this.servicesPage, this.httpOptions)
        .subscribe((result: any) => {
          this.services = this.services.concat(result.data);
          console.log("total pages: "+result.meta.pagination.total_pages);
          if(this.servicesPage <= result.meta.pagination.total_pages ){
            this.servicesPage++;
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





  wasClicked = false;
  // onClick() {
  //   console.log('click');
  //   this.wasClicked= !this.wasClicked;
  //   var selected = document.querySelectorAll('.selected');
  //   console.log(selected.length);
  //   if(selected.length > 0){
  //     this.hasSelectedServices = true;
  //   } else {
  //     this.hasSelectedServices = false;
  //   }
  //   //this.clickedServices.push()
  // }

  goToDate(){
    var clickedServices = [];
    var selected = document.querySelectorAll('.selected');
    var service:Service;
    var servicesSelected:Array<Service> = [];

    
    console.log(selected);
    selected.forEach( function(element) {
      console.log('servicios');
      // console.log(JSON.parse(element.getAttribute('data-service')));
      //clickedServices.push(element.getAttribute('data-id'))
      service = new Service()
      service.id = element.getAttribute('data-id');
      service.name = element.getAttribute('data-name');
      service.value = element.getAttribute('data-value');

      servicesSelected.push(service);

    });


    if(servicesSelected.length > 0 ){
      console.log(servicesSelected);
      this.storage.set('services',servicesSelected);
  
      this.router.navigate(['/step-dates']);
    }


  }

}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
