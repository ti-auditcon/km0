import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

// import { File } from '@ionic-native/file/ngx';
// import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

}
