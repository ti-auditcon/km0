import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-diagnostic',
  templateUrl: './step-diagnostic.page.html',
  styleUrls: ['./step-diagnostic.page.scss'],
})
export class StepDiagnosticPage implements OnInit {

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
