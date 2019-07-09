import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-service',
  templateUrl: './step-service.page.html',
  styleUrls: ['./step-service.page.scss'],
})
export class StepServicePage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goToDate(){
    this.router.navigate(['/step-dates']);
  }

}
