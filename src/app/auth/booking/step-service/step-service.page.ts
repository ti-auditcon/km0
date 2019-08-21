//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-step-service',
  templateUrl: './step-service.page.html',
  styleUrls: ['./step-service.page.scss'],
})
export class StepServicePage implements OnInit {

  
  hightlightStatus: Array<boolean> = [];
  item:any;
  httpOptions:any;
  services:any = '';
  
  clickedServices:Array<number> = [];
  
  


  // services:any = [
  //   {
  //     title: 'Full Bicicleta',
  //     icon: 'icon-bike.svg',
  //     description: 'Incluye Lavado, regulación de cambios y engrase de trasmisión, frenos, engrasado todos los rodamientos.',
  //     price: '22.000'
  //   },
  //   {
  //     title: 'General Bicicleta',
  //     icon: 'icon-bike.svg',
  //     description: 'Etiam ultricies vel metus sed sagittis. Ut hendrerit, neque eu sodales maximus.',
  //     price: '10.000'
  //   },
  //   {
  //     title: 'Horquilla',
  //     icon: 'icon-bike.svg',
  //     description: 'Etiam ultricies vel metus sed sagittis. Ut hendrerit, neque eu sodales maximus.',
  //     price: '25.000'
  //   }
  // ]

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

        this.http.get(SERVER_URL+"api/services", this.httpOptions)
        .subscribe((result: any) => {
          this.services = result.data;
          console.log(this.services);

        });

    });
  }

  wasClicked = false;
  onClick() {
    this.wasClicked= !this.wasClicked;
    //this.clickedServices.push()
  }

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
    console.log(servicesSelected);
    this.storage.set('services',servicesSelected);

    this.router.navigate(['/step-dates']);
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
