import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  resetEmail = { email: ''};
  disableButton:boolean;

  constructor(
    private authService: AuthenticationService,
    public router:Router
  ) { }



  ngOnInit() {
  }
  ionViewDidEnter() {
    this.disableButton = false;
  }
  forget() {
    this.disableButton = true;
    this.authService.forget(this.resetEmail)
    .then(data => {
          console.log(data);
          alert('revice su correo para restrablecer contraseña.');
        })
    .catch(async e => {
      console.log('primero: '+e);

    });

  }

}
