import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-pay',
  templateUrl: './step-pay.page.html',
  styleUrls: ['./step-pay.page.scss'],
})
export class StepPayPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  
}
