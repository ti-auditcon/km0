import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-dates',
  templateUrl: './step-dates.page.html',
  styleUrls: ['./step-dates.page.scss'],
})
export class StepDatesPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToSummary(){
    this.router.navigate(['/step-summary']);
  }

}
