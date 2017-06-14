import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../../share/services/validation.service';
import { APIService } from '../../share/services/api.service';
import { Article } from '../../models/article';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})

export class EditorPageComponent  { 
	articleForm: FormGroup;
	title: FormControl = new FormControl("", Validators.required);
	content: FormControl = new FormControl("", Validators.required);
	title_image: FormData = new FormData();
	category: FormControl = new FormControl("", Validators.required);
	tags: FormControl = new FormControl("");
	arrayCategories: any;
	file: File;
	loaded: boolean = false;
	imageSrc: string = "";
	slugArticle: string;
	apiURL: string;
	constructor(
		_formBuilder: FormBuilder,
		private _appConfig: AppConfig,
		private _apiService: APIService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		if (!this._appConfig.currentUser) {
			this._router.navigate(['/login']);
		}
		window.scrollTo(0, 0);
		this.articleForm = _formBuilder.group({
			title: this.title,
			content: this.content,
			title_image: this.title_image,
			category: this.category,
			tags: this.tags
		});
		this.apiURL = _appConfig.serverUrl;
		this._apiService.getCategories()
		.subscribe((data: any) => {
			this.arrayCategories = data.categories;
		});
	}

	ngOnInit() {
		let param = this._route.snapshot.params["slug"];
		console.log(param);
		if (param) {
			this.slugArticle = param;
			this._apiService.getArticle(this.slugArticle)
			.subscribe((data: any) => {
				this.title.setValue(data.article.title);
				this.content.setValue(data.article.content);
				this.category.setValue(data.article.category.id);
				this.tags.setValue(this.setTag(data.article.tags));
				this.imageSrc = this.apiURL + data.article.title_image.url;
				this.loaded = true;
			});
		}
	}
	// test() {
	// 	console.log(this.getTag(this.tags.value));
	// }
	// onChange(e: any) {
	// 	console.log(e);
	// }
	setTag(array: any) {
		let str: string = "";
		for (var i = 0, len = array.length; i < len; i++) {
			str += "#" + array[i].name;
			if (i < array.length - 1) {
				str += " ";
			}
		}
		return str;
	}
	getTag(str: string) {
		str = str.substring(1);
		let arrayTag = str.split(" #").join(",");
		return arrayTag;
	}
	save() {
		let formData: FormData = new FormData();
		if (this.slugArticle) {
			formData.append('id', this.slugArticle);
			console.log("update");
		} else {
			formData.append('id', '');
			console.log("create");
		}
		formData.append('title', this.articleForm.value.title);
		formData.append('content', this.articleForm.value.content);
		formData.append('category_id', this.articleForm.value.category);
		formData.append('tags', this.getTag(this.articleForm.value.tags));
		if (this.file) {
			formData.append('title_image', this.file);
		} else {
			formData.append('title_image', this.imageSrc);
		}
		if (this.slugArticle) {
			this._apiService.updateArticle(formData, this.slugArticle)
			.subscribe((data: any) => {
				if (data.status === 200) {
					this.goToArticleDetail(data.slug);
				} else {
					alert(data.message);
				}
			});
		} else {
			this._apiService.createArticle(formData)
			.subscribe((data: any) => {
				if (data.status && data.status === 200) {
					this.goToArticleDetail(data.slug);
				} else {
					alert(data.message);
				}
			});
		}
	}
	fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
    	var reader = new FileReader();
    	this.loaded = false;
    	reader.onload = this._handleReaderLoaded.bind(this);
    	reader.readAsDataURL(this.file);
    }
	}
	_handleReaderLoaded(e: any) {
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }
  goToArticleDetail(slug: string){
  	this._router.navigate(['/article', slug]);
  }
}
