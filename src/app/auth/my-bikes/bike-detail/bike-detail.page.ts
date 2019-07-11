import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.page.html',
  styleUrls: ['./bike-detail.page.scss'],
})
export class BikeDetailPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
