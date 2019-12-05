import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-diagnostic',
  templateUrl: './step-diagnostic.page.html',
  styleUrls: ['./step-diagnostic.page.scss'],
})
export class StepDiagnosticPage implements OnInit {

  public order:any;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  goToChat(){
    this.router.navigate(['/chat']);
  }

}
