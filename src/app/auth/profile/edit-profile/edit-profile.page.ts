//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';




@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


  profileForm: FormGroup;
  passForm: FormGroup;
  httpOptions: any;
  profile: any;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    private http:HttpClient,
    public toastController: ToastController


  ){
    this.profileForm = formBuilder.group({
        phone: [''],
        address: [''],
        city: [''],
    });
    this.passForm = formBuilder.group({
        password: [''],
        confirm: ['']
    });
   }

   async presentToast(message:any) {
    const toast = await this.toastController.create({

      message: message,
      duration: 4000,
      position: 'top',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
   
  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        this.http.get(SERVER_URL+"api/profile", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.profile = result.data;
          this.profileForm.setValue({
            phone: this.profile.phone, 
            address: this.profile.address,
            city: this.profile.city,
          });
        });


    });
  }

  profileUpdate() {
    this.storage.get('auth-token').then((value) => {
      let data=JSON.stringify({
        phone: this.profileForm.get('phone').value,
        address: this.profileForm.get('address').value,
        city: this.profileForm.get('city').value,
      });

      let Bearer = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer,//updated
          'Content-Type': 'application/json', //updated
        })};

        this.http.post(SERVER_URL+"api/profile/",data ,this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.presentToast('datos actualizados con éxito');
          this.modalCtrl.dismiss({
            'dismissed': true
          });


        });


    });

  }


  profilePassword() {
    if(this.passForm.get('password').value == this.passForm.get('confirm').value){
      this.storage.get('auth-token').then((value) => {
        let data=JSON.stringify({
          password: this.passForm.get('password').value,
  
        });
  
        let Bearer = value;
        this.httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '+ Bearer,//updated
            'Content-Type': 'application/json', //updated
          })};
  
          this.http.post(SERVER_URL+"api/profile/password",data ,this.httpOptions)
          .subscribe((result: any) => {
            console.log(result);
            this.presentToast('la contraseña a cambiado con éxito');
            this.modalCtrl.dismiss({
              'dismissed': true
            });
  
  
          });
  
  
      });
    } else {
      this.presentToast('la contraseña no coincide');
    }


  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
