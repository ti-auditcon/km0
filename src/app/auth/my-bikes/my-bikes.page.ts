import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bikes',
  templateUrl: './my-bikes.page.html',
  styleUrls: ['./my-bikes.page.scss'],
})
export class MyBikesPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goToBikeDetail(){
    this.router.navigate(['/bike-detail']);
  }

}
