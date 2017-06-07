import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})

export class SettingPageComponent  {
	username: any;
	userForm: FormGroup;
	fullname: FormControl = new FormControl("");
	birthday: FormControl = new FormControl("");
	description: FormControl = new FormControl("");
	avatar: File;
	imageSrc: string = "";
	loaded: boolean = false;
	apiURL: string;
	constructor(
		_formBuilder: FormBuilder,
		private _appConfig: AppConfig,
		private _apiService: APIService,
		private _route: ActivatedRoute,
    private _router: Router
	) {
		this.userForm = _formBuilder.group({
			fullname: this.fullname,
			birthday: this.birthday,
			description: this.description
		});
		this.apiURL = _appConfig.serverUrl;
	}
  
	ngOnInit() {
		let user = this._appConfig.currentUser;
		this.username = user.username;
    this._apiService.getUser(this.username)
    .subscribe((data: any) => {
      this.fullname.setValue(data.user.fullname);
      this.birthday.setValue(data.user.birthday);
      this.description.setValue(data.user.description);
      this.imageSrc = this.apiURL + data.user.avatar;
      this.loaded = true;
    });
	}
	fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.avatar = fileList[0];
    	var reader = new FileReader();
    	this.loaded = false;
    	reader.onload = this._handleReaderLoaded.bind(this);
    	reader.readAsDataURL(this.avatar);
    }
	}
	_handleReaderLoaded(e: any) {
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }
  update() {
  	// console.log(this.userForm.value);
  	let formData: FormData = new FormData();
  	formData.append('username', this.username);
  	formData.append('fullname', this.fullname.value);
  	formData.append('birthday', this.birthday.value);
  	formData.append('description', this.description.value);
  	if (this.avatar) {
			formData.append('avatar', this.avatar);
		} else {
			formData.append('avatar', this.imageSrc);
		}
		this._apiService.updateUser(formData, this.username)
		.subscribe((data: any) => {
			if (data.user) {
				let user = data.user;
				if (user && user.access_token) {
	        localStorage.setItem('currentUser', JSON.stringify(user));
	      }
				this._router.navigate(['/profile', this.username]);
			} else {
				alert(data.errors);
				// console.log(data);
			}
		})
	}
  cancel() {
  	this._router.navigate(['/profile', this.username]);
  }
}
