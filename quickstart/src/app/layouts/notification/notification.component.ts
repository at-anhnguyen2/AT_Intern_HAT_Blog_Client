import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  host: {
    '(document:click)': 'onClick($event)',
  }
})

export class NotificationComponent {
  @Input() inputNotification: any = null;
  @Output() result: EventEmitter<any> = new EventEmitter();
  @Output() hiddenNotification: EventEmitter<any> = new EventEmitter();
  arrayNotification: any;
  haveNotification: boolean;
	constructor(
    private _apiService: APIService,
    private _appConfig: AppConfig,
    private _elementRef: ElementRef
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
        } else {
          console.log(data);
        }
      })
    }
  }
  onClick(e: any) {
    if (this._elementRef.nativeElement.contains(e.target)) {
      console.log('editting');
    } else {
      if (e.target.className !== 'glyphicon glyphicon-globe' && e.target.className !== 'click-notification' ) {
        this.hiddenNotification.emit(false);
      }
    }
  }
}
