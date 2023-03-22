import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public constructor(private _notification: NzNotificationService) {
    /** Empty Constructor */
  }

  public notification(type: string, title: string, message: string): void {
    this._notification.create(type, title, message);
  }
}
