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
  // now:Date; 
  // close:Date; 
  // in:Date; 
  // out:Date; 
  dateText:string; 
  start:string;
  end:string;


  constructor(

    private router: Router,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

    // this.now = new Date();
    // this.close = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 19, 0, 0);

    // this.in = this.now;
    // this.out = new Date();
    // console.log('in antes');
    // console.log(this.in);
    
    // console.log('in despues');
    // console.log(this.in);
    // console.log(this.out);
    
    // if(this.in > this.close){
    //   console.log('mayor');
    //   this.in.setDate(this.in.getDate() + 1);
    // }
    // if(this.in.getDay() === 0)
    // {
    //   console.log('dia');
    //   this.in.setDate(this.in.getDate() + 1);
    // }

    // this.out.setDate(this.in.getDate() + 1);
    // console.log('in');
    // console.log(this.in);
    // console.log('out');
    // console.log(this.out);

    // if(this.out.getDay() == 0)
    // {
    //   this.out.setDate(this.out.getDate() + 1);
    // }



    this.storage.get('auth-token').then((value) => {

      let Bearer = value;


      let data=JSON.stringify({
        blocks: 10,
      });

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer,//updated
          'Content-Type': 'application/json', //updated
        })};

        this.http.post(SERVER_URL+"api/orders-checkblock",data, this.httpOptions)
        .subscribe((result: any) => {
          console.log('check');
          console.log(result);
          this.dateText = result.text;
          this.start = result.start;
          this.end = result.end;
        });

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
