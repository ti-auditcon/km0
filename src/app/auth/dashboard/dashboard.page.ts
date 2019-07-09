import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goToBooking(){
    this.router.navigate(['/step-bike']);
  }
  goToBookingStatus(){
    this.router.navigate(['/step-on-waiting']);
  }
  goToEvents() {
    this.router.navigate(['/events']);
  }
  goToEventDetail() {
    this.router.navigate(['/event-detail']);
  }

}
