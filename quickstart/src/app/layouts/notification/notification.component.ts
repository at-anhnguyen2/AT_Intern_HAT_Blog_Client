import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() inputNotifications: any = null;
  @Output() hiddenNotification: EventEmitter<any> = new EventEmitter();
  arrayNotification: any;
  haveNotification: boolean;
	constructor(
    private _apiService: APIService,
    private _appConfig: AppConfig,
    private _elementRef: ElementRef,
    private _router: Router
  ) { }

  ngOnChanges() {
    this.arrayNotification = this.inputNotifications;
    if (this.inputNotifications && this.inputNotifications.length !== 0) {
      this.haveNotification = true;
    } else {
      this.haveNotification = false;
    }
  }

  onClick(e: any) {
    if (this._elementRef.nativeElement.contains(e.target)) {
      // console.log('editting');
    } else {
      if (e.target.className !== 'glyphicon glyphicon-globe' && e.target.className !== 'click-notification' ) {
        this.hiddenNotification.emit(false);
        this.updateNotification();
      }
    }
  }

  clickNotificationItem(obj: any) {
    if (obj.types === 'user') {
      this._router.navigate(['/profile', obj.param]);
    } else {
      this._router.navigate(['/article', obj.param]);
    }
    this.hiddenNotification.emit(false);
    this.updateNotification();
  }

  updateNotification() {
    if (this._appConfig.currentUser && this.arrayNotification) {
      let arrayTemp = this.arrayNotification.filter((obj: any) => 
        obj.isChecked === false
      )
      for (var item of arrayTemp) {
        this._apiService.updateNotification(item.id)
        .subscribe((data: any) => {
          this.arrayNotification = data.notifications;
        })
      }
    }
  }
}
