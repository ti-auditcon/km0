import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goToEventDetail(){
    this.router.navigate(['/event-detail']);
  }

}
