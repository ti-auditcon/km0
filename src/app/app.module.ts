import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule} from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalAddBikePageModule } from './auth/booking/step-bike/modal-add-bike/modal-add-bike.module';
import { ModalAddPiecePageModule } from './auth/booking/step-bike/modal-add-piece/modal-add-piece.module';
import { ModalChangeOfficePageModule } from './auth/booking/step-bike/modal-change-office/modal-change-office.module';
import { ModalInfoPricePageModule } from './auth/booking/step-summary/modal-info-price/modal-info-price.module';
import { ModalImagePageModule } from './auth/events/event-detail/modal-image/modal-image.module';
import { ModalAddBikeProfilePageModule } from './auth/my-bikes/modal-add-bike-profile/modal-add-bike-profile.module';
import { ModalAddSpecializedPageModule } from './auth/my-bikes/modal-add-specialized/modal-add-specialized.module';
import { EditProfilePageModule } from './auth/profile/edit-profile/edit-profile.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import localeEs from '@angular/common/locales/es';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ModalAddBikePageModule,
    ModalAddPiecePageModule,
    ModalChangeOfficePageModule,
    ModalInfoPricePageModule,
    ModalImagePageModule,
    ModalAddBikeProfilePageModule,
    ModalAddSpecializedPageModule,
    EditProfilePageModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
