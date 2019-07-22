//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.page.html',
  styleUrls: ['./bike-detail.page.scss'],
})
export class BikeDetailPage implements OnInit {
  bike:any = '';
  httpOptions:any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"api/bikes/"+id, this.httpOptions)
        .subscribe((result: any) => {
          this.bike = result.data;
          console.log(this.bike);
        });

    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Esta seguro de borrar su bicicleta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('no borrar');
          }
        }, {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            console.log('borrar');
          }
        }
      ]
    });

    await alert.present();
  }

  delete() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.delete(SERVER_URL+"api/bikes/"+id, this.httpOptions)
    .subscribe((result: any) => {
      this.router.navigate(['/profile/bikes']);
    });

  }
}
