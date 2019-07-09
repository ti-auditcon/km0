import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-on-diagnostic',
  templateUrl: './step-on-diagnostic.page.html',
  styleUrls: ['./step-on-diagnostic.page.scss'],
})
export class StepOnDiagnosticPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }

  goToChat(){
    this.router.navigate(['/chat']);
  }

}
