import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-bike',
  templateUrl: './step-bike.page.html',
  styleUrls: ['./step-bike.page.scss'],
})
export class StepBikePage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goToService(){
    this.router.navigate(['/step-service']);
  }

}
