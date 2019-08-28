import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HasNotificationsService {

  constructor() { }

  public hasNotifications(){
    return true;
  }
}
