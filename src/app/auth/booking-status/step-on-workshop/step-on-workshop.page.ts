import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-on-workshop',
  templateUrl: './step-on-workshop.page.html',
  styleUrls: ['./step-on-workshop.page.scss'],
})
export class StepOnWorkshopPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  goToChat(){
    this.router.navigate(['/chat']);
  }

}
