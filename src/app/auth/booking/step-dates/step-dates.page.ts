import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-dates',
  templateUrl: './step-dates.page.html',
  styleUrls: ['./step-dates.page.scss'],
})
export class StepDatesPage implements OnInit {

  public discount:boolean;
  public retiro:boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToSummary(){
    this.router.navigate(['/step-summary']);
  }

}
