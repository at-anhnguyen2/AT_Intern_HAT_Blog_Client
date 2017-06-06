import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})

export class NotificationComponent {
  @Input() inputNotification: any = null;
  @Output() result: EventEmitter<any> = new EventEmitter();
  arrayNotification: any;
  haveNotification: boolean;
	constructor(
    private _apiService: APIService,
    private _appConfig: AppConfig
  ) { }

  ngOnInit() {
    if (this._appConfig.currentUser) {
      this._apiService.getNotifications()
      .subscribe((data: any) => {
        if(data && data.notifications){
          this.arrayNotification = data.notifications;
          if (this.arrayNotification.length === 0) {
            this.haveNotification = false;
          } else {
            this.haveNotification = true;
          }
          let arrayTemple = this.arrayNotification.filter((obj: any) => 
            obj.isChecked === false
          );
          this.result.emit(arrayTemple);
        } else {
          console.log(data);
        }
      })
    }
  }

  ngOnChanges() {
    this._apiService.getNotifications()
    .subscribe((data: any) => {
      if(data && data.notifications){
        this.arrayNotification = data.notifications;
        if (this.arrayNotification.length === 0) {
          this.haveNotification = false;
        } else {
          this.haveNotification = true;
        }
      } else {
        console.log(data);
      }
    })
  }
}
