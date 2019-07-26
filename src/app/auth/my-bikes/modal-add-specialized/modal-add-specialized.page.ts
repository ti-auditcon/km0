import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-add-specialized',
  templateUrl: './modal-add-specialized.page.html',
  styleUrls: ['./modal-add-specialized.page.scss'],
})
export class ModalAddSpecializedPage implements OnInit {

  hightlightStatus: Array<boolean> = [];

  bikes:any = [
    {
      title: 'S-Works Epic',
      year: '2019',
      img: '/assets/img/bike-example.jpg'
    },
    {
      title: 'S-Works Epic Hardtail',
      year: '2019',
      img: '/assets/img/bike-example.jpg'
    },
    {
      title: 'Epic Pro',
      year: '2019',
      img: '/assets/img/bike-example.jpg'
    },
    {
      title: 'Epic Hardtail Pro',
      year: '2019',
      img: '/assets/img/bike-example.jpg'
    },
    {
      title: 'Epic Expert',
      year: '2019',
      img: '/assets/img/bike-example.jpg'
    },
    {
      title: 'Epic Hardtail Expert',
      year: '2019',
      img: '/assets/img/bike-example.jpg'
    },
    {
      title: 'Epic Comp Carbon',
      year: '2019',
      img: '/assets/img/bike-example.jpg'
    }
  ];

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) { }  

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
