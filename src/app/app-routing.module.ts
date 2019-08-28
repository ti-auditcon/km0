import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  // Dashboard
  { path: 'dashboard', loadChildren: './auth/dashboard/dashboard.module#DashboardPageModule' },
  // Reservar
  { path: 'step-bike', loadChildren: './auth/booking/step-bike/step-bike.module#StepBikePageModule' },
  { path: 'step-service', loadChildren: './auth/booking/step-service/step-service.module#StepServicePageModule' },
  { path: 'step-dates', loadChildren: './auth/booking/step-dates/step-dates.module#StepDatesPageModule' },
  { path: 'step-summary', loadChildren: './auth/booking/step-summary/step-summary.module#StepSummaryPageModule' },
  { path: 'step-pay', loadChildren: './auth/booking/step-pay/step-pay.module#StepPayPageModule' },
  // Estados de Reserva + Chat
  { path: 'step-on-waiting', loadChildren: './auth/booking-status/step-on-waiting/step-on-waiting.module#StepOnWaitingPageModule' },
  { path: 'step-on-diagnostic', loadChildren: './auth/booking-status/step-on-diagnostic/step-on-diagnostic.module#StepOnDiagnosticPageModule' },
  { path: 'step-diagnostic', loadChildren: './auth/booking-status/step-diagnostic/step-diagnostic.module#StepDiagnosticPageModule' },
  { path: 'step-on-workshop', loadChildren: './auth/booking-status/step-on-workshop/step-on-workshop.module#StepOnWorkshopPageModule' },
  { path: 'step-ready', loadChildren: './auth/booking-status/step-ready/step-ready.module#StepReadyPageModule' },
  { path: 'chat', loadChildren: './auth/booking-status/chat/chat.module#ChatPageModule' },
  // Eventos
  { path: 'events', loadChildren: './auth/events/events.module#EventsPageModule' },
  { path: 'events/:id', loadChildren: './auth/events/event-detail/event-detail.module#EventDetailPageModule' },
  // Perfil
  { path: 'profile', loadChildren: './auth/profile/profile.module#ProfilePageModule' },
  { path: 'profile/bikes', loadChildren: './auth/my-bikes/my-bikes.module#MyBikesPageModule' },
  { path: 'profile/bikes/:id', loadChildren: './auth/my-bikes/bike-detail/bike-detail.module#BikeDetailPageModule' },
  { path: 'profile/services', loadChildren: './auth/my-services/my-services.module#MyServicesPageModule' },
  { path: 'profile/services/:id', loadChildren: './auth/my-services/service-detail/service-detail.module#ServiceDetailPageModule' },
  { path: 'public-profile', loadChildren: './auth/public-profile/public-profile.module#PublicProfilePageModule' },
  //Notificaciones
  { path: 'notifications', loadChildren: './auth/notifications/notifications.module#NotificationsPageModule' },
  { path: 'special-message', loadChildren: './auth/notifications/special-message/special-message.module#SpecialMessagePageModule' },
  // Modales
  { path: 'modal-add-bike', loadChildren: './auth/booking/step-bike/modal-add-bike/modal-add-bike.module#ModalAddBikePageModule' },
  { path: 'modal-add-piece', loadChildren: './auth/booking/step-bike/modal-add-piece/modal-add-piece.module#ModalAddPiecePageModule' },
  { path: 'modal-change-office', loadChildren: './auth/booking/step-bike/modal-change-office/modal-change-office.module#ModalChangeOfficePageModule' },
  { path: 'modal-change-office', loadChildren: './auth/booking/step-bike/modal-change-office/modal-change-office.module#ModalChangeOfficePageModule' },
  { path: 'modal-info-price', loadChildren: './auth/booking/step-summary/modal-info-price/modal-info-price.module#ModalInfoPricePageModule' },
  { path: 'modal-public-image', loadChildren: './auth/public-profile/modal-public-image/modal-public-image.module#ModalPublicImagePageModule' },
  { path: 'modal-image', loadChildren: './auth/events/event-detail/modal-image/modal-image.module#ModalImagePageModule' },
  { path: 'modal-add-bike-profile', loadChildren: './auth/my-bikes/modal-add-bike-profile/modal-add-bike-profile.module#ModalAddBikeProfilePageModule' },
  { path: 'modal-add-specialized', loadChildren: './auth/my-bikes/modal-add-specialized/modal-add-specialized.module#ModalAddSpecializedPageModule' },
  // PUBLIC
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'forget', loadChildren: './public/forget/forget.module#ForgetPageModule' },
  //ORDERS
  { path: 'orders/:id', loadChildren: './auth/order/order.module#OrderPageModule' },
  { path: 'orders/:id/chat', loadChildren: './auth/order/chat/chat.module#ChatPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
