//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile:any = '';
  httpOptions:any;

  photo: SafeResourceUrl;

  constructor(
    private router: Router,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    private http:HttpClient,
    private sanitizer: DomSanitizer
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
        this.http.get(SERVER_URL+"api/profile", this.httpOptions)
        .subscribe((result: any) => {
          this.profile = result.data;
        });
    });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.dataUrl);
    // console.log("Aqui va la var photo: "+this.photo);
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
