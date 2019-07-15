import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-service',
  templateUrl: './step-service.page.html',
  styleUrls: ['./step-service.page.scss'],
})
export class StepServicePage implements OnInit {

  // status: boolean = false;
  hightlightStatus: Array<boolean> = [];
  item:any;
  services:any = [
    {
      title: 'Full Bicicleta',
      icon: 'icon-bike.svg',
      description: 'Incluye Lavado, regulación de cambios y engrase de trasmisión, frenos, engrasado todos los rodamientos.',
      price: '22.000'
    },
    {
      title: 'General Bicicleta',
      icon: 'icon-bike.svg',
      description: 'Etiam ultricies vel metus sed sagittis. Ut hendrerit, neque eu sodales maximus.',
      price: '10.000'
    },
    {
      title: 'Horquilla',
      icon: 'icon-bike.svg',
      description: 'Etiam ultricies vel metus sed sagittis. Ut hendrerit, neque eu sodales maximus.',
      price: '25.000'
    }
  ]

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  wasClicked = false;
  onClick() {
    this.wasClicked= !this.wasClicked;
  }

  goToDate(){
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
