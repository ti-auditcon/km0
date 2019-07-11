import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-ready',
  templateUrl: './step-ready.page.html',
  styleUrls: ['./step-ready.page.scss'],
})
export class StepReadyPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  goToChat(){
    this.router.navigate(['/chat']);
  }


}
