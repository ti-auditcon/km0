import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-summary',
  templateUrl: './step-summary.page.html',
  styleUrls: ['./step-summary.page.scss'],
})
export class StepSummaryPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goToPay() {
    this.router.navigate(['/step-pay']);
  }

}
