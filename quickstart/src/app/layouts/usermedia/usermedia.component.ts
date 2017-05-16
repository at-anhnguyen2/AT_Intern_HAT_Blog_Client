import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-user-media',
  templateUrl: './usermedia.html'
})

export class UserMediaComponent  {
	@Input() inputUser: any = null;
	@Input() inputDate: any = null;
	user: any;
	date: any;
	constructor() {
		this.user = null;
		this.date = null;
	}
	ngOnChanges() {
		this.user = this.inputUser;
		this.date = this.inputDate;
	}
}
