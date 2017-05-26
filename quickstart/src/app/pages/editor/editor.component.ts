import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../../share/services/validation.service';
import { ArticleService } from '../../share/services/article.service';
import { Article } from '../../models/article';

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
	file: File;
	loaded: boolean = false;
	imageSrc: string = "";
	slugArticle: string;
	apiURL: string = 'http://172.17.19.122:3000';
	constructor(
		_formBuilder: FormBuilder,
		private _articleService: ArticleService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.articleForm = _formBuilder.group({
			title: this.title,
			content: this.content,
			title_image: this.title_image,
			category: this.category,
			tags: this.tags
		})
	}

	ngOnInit() {
		let param = this._route.snapshot.params["slug"];
		console.log(param);
		if (param) {
			this.slugArticle = param;
			this._articleService.getArticle(this.slugArticle)
			.subscribe((data: any) => {
				console.log(data.article);
				this.title.setValue(data.article.title);
				this.content.setValue(data.article.content);
				this.category.setValue(data.article.category.id);
				this.tags.setValue(data.article.tags);
				this.imageSrc = this.apiURL + data.article.title_image.url;
				this.loaded = true;
			});
		}
	}
	save() {
		let formData: FormData = new FormData();
		// console.log(this.slugArticle);
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
		formData.append('tags', this.articleForm.value.tags);
		if (this.file) {
			formData.append('title_image', this.file);
		} else {
			formData.append('title_image', this.imageSrc);
		}
		if (this.slugArticle) {
			this._articleService.updateArticle(formData, this.slugArticle)
			.subscribe((data: any) => {
				if (data.status === 200) {
					this.goToArticleDetail(data.slug);
				} else {
					alert(data.message);
				}
			});
		} else {
			this._articleService.createArticle(formData)
			.subscribe((data: any) => {
				if (data.status === 200) {
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
