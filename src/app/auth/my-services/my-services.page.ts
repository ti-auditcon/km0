import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.page.html',
  styleUrls: ['./my-services.page.scss'],
})
export class MyServicesPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  goToServiceDetail() {
    this.router.navigate(['/service-detail']);
  }

}
