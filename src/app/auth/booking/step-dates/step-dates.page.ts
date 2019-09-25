//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-step-dates',
  templateUrl: './step-dates.page.html',
  styleUrls: ['./step-dates.page.scss'],
})
export class StepDatesPage implements OnInit {

  public discount:boolean;
  public retiro:boolean;
  httpOptions:any;
  hasNotifications:boolean;


  constructor(

    private router: Router,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;


      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};



        this.http.get(SERVER_URL+"api/profile/notifications/has", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.hasNotifications = result;
        });

    });
  }

  goToSummary(){
    this.router.navigate(['/step-summary']);
  }

}
