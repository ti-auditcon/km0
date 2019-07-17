import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalAddBikePageModule } from './auth/booking/step-bike/modal-add-bike/modal-add-bike.module';
import { ModalAddPiecePageModule } from './auth/booking/step-bike/modal-add-piece/modal-add-piece.module';
import { ModalChangeOfficePageModule } from './auth/booking/step-bike/modal-change-office/modal-change-office.module';
import { ModalInfoPricePageModule } from './auth/booking/step-summary/modal-info-price/modal-info-price.module';
import { ModalImagePageModule } from './auth/events/event-detail/modal-image/modal-image.module';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalAddBikePageModule,
    ModalAddPiecePageModule,
    ModalChangeOfficePageModule,
    ModalInfoPricePageModule,
    ModalImagePageModule
  ],
  providers: [
    StatusBar,
    PhotoViewer,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
