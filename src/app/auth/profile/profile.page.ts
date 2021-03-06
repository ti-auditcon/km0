//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController, ToastController } from '@ionic/angular';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//models
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile:any = '';
  httpOptions:any;
  hasNotifications:boolean;
  selectedImage: any;

  

  photo: SafeResourceUrl;

  constructor(
    private router: Router,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    private http:HttpClient,
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    public toastController: ToastController
  ) { }

  doRefresh(event) {
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
          var userModel:User;

          userModel = new User();
          userModel.id = result.data.id;
          userModel.name = result.data.fullName;
          userModel.avatar = result.data.avatar;
          userModel.city = result.data.city;
      
          console.log(userModel);
          this.storage.set('user',userModel);
          this.storage.set('discount',result.data.discount);
        });

        this.http.get(SERVER_URL+"api/profile/notifications/has", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.hasNotifications = result;
        });

    });
    setTimeout(() => {
      event.target.complete();
    }, 2000);
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
          var userModel:User;

          userModel = new User();
          userModel.id = result.data.id;
          userModel.name = result.data.fullName;
          userModel.avatar = result.data.avatar;
          userModel.city = result.data.city;
      
          console.log(userModel);
          this.storage.set('user',userModel);
          this.storage.set('discount',result.data.discount);
        });

        this.http.get(SERVER_URL+"api/profile/notifications/has", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.hasNotifications = result;
        });

    });
  }

  async takePicture() {
    

    const image = await Plugins.Camera.getPhoto({
      quality: 60,
      width:720,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    });
   // input.append('avatar',image.base64String,'avatar');
    let input = new FormData();
    input.append("avatar", image.base64String);

    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.post(SERVER_URL+"api/profile/avatar",input, this.httpOptions)
        .subscribe((result: any) => {
          console.log('avataaaar!');
          console.log(result);
          this.presentToast('datos actualizados con éxito');
          this.ionViewDidEnter();
        });


    });

    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    //this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl("data:Image/*;base64,"+image.dataUrl);
    // console.log("Aqui va la var photo: "+this.photo);
  }



  async editProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfilePage
    });
    modal.onDidDismiss().then(data => {
      this.ionViewDidEnter();
    });
    return await modal.present();
  }

  goToMyBikes(){
    this.router.navigate(['/profile/bikes']);
  }

  goToMyServices(){
    this.router.navigate(['/profile/services']);
  }
  logout() {
    this.authenticationService.logout();
  }

}
