
//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public httpOptions:any;
  public notifications:any;

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
        //profile
        this.http.get(SERVER_URL+"api/profile/notifications/view", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
        });

        this.http.get(SERVER_URL+"api/profile/notifications?sort_by_desc=createdAt", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.notifications = result.data;

        });


    });
  }

  goTo(type:number, id:number){

    switch(type) {
      case 1:
        this.router.navigate(['/orders/'+id]);
        break;
      case 2:
        this.router.navigate(['/orders/'+id+'/chat']);
        break;
      case 3:
        this.router.navigate(['/profile/bikes/'+id]);
        break;
      default:
        // code block
    } 
  }

  // goToChat(){
  //   this.router.navigate(['/chat']);
  // }

  // goToStatus(){
  //   this.router.navigate(['/step-on-waiting']);
  // }

  // goToSpecialMessage(){
  //   this.router.navigate(['/special-message']);
  // }



}
