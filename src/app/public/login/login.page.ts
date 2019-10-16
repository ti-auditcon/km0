import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registerCredentials = { email: '', password: '' };
  error:any = '';

  constructor(
    private authService: AuthenticationService,
    private storage: Storage,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  login() {

    this.authService.login(this.registerCredentials)
    .then(data => {
          console.log(data);
        })
    .catch(async e => {
      console.log('primero: '+e);
      console.log('segundo: '+this.error.error );
      console.log('tersero: '+this.error.message );
      alert('El usuario no existe o la contraseña es incorrecta. Intente nuevamente.');
    });

  }

}
