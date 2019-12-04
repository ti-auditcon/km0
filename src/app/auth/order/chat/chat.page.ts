
//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  httpOptions:any;
  messages:any;
  text:any;
  order:any;
  disableButton:boolean;

  @ViewChild('content',{static: true}) content: IonContent;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private http:HttpClient
  ) { }

  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.disableButton = false;
    let that = this;
    this.content.scrollToBottom(200);
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
      
      this.http.get(SERVER_URL+"api/orders/"+id, this.httpOptions)
        .subscribe((result: any) => {
          
          this.order = result.data;
      });  

      this.http.get(SERVER_URL+"api/orders/"+id+"/messages?all=true", this.httpOptions)
        .subscribe((result: any) => {
          
          this.messages = result.data;
          this.content.scrollToBottom(200);
      });

      
      

    });
  }
  sendMessage() {
    if(this.text == null){
      console.log('nada');
    } else {
      this.storage.get('auth-token').then((value) => {

        let Bearer = value;
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        let data=JSON.stringify({
          content: this.text,
  
        });
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json', //updated
            'Authorization': 'Bearer '+ Bearer//updated
            
          })};
  
        this.disableButton = true;
        this.http.post(SERVER_URL+"api/orders/"+id+"/messages",data, this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.text = null;
          this.ionViewDidEnter();
        },
        (err) => {
          console.log('error refrersh 401');
          this.ionViewDidEnter();
        }
        );
    
      });
    }

  }

  goToOrder(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log('entre:'+id);
    this.router.navigate(['/orders/'+id+'']);
  }

}
