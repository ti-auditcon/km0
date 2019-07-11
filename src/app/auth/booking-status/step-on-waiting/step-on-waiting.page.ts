import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-on-waiting',
  templateUrl: './step-on-waiting.page.html',
  styleUrls: ['./step-on-waiting.page.scss'],
})
export class StepOnWaitingPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  goToChat(){
    this.router.navigate(['/chat']);
  }

}
