import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})

export class ArticlePageComponent  {
	currentUser: any;
	article: any;
	arrayPopularArticles: any;
	inputComment: string;
	inputEditComment: string;
	isCurrentUser: boolean;
	isViewAllComment: boolean;
	idComment: number;
	param: any;
	slug: string;
	constructor(
		private _apiService: APIService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _appConfig: AppConfig
	) {
		this.currentUser = this._appConfig.currentUser;
		this.inputComment = "";
		this.inputEditComment = "";
		this.idComment = 0;
		this.isViewAllComment = false;
	}

	ngOnInit() {
		this._router.events.subscribe((evt: any) => {
      window.scrollTo(0, 0)
    });
		this.param = this._route.params.subscribe((data: any) => {
			this.slug = data['slug'];
			this._apiService.getArticle(this.slug)
			.subscribe((data: any) => {
				this.article = data.article;
				this.article.comments.reverse();
				this._apiService.getPopularArticles(data.article.user.username)
				.subscribe((data: any) => {
					this.arrayPopularArticles = data.articles;
				});
				if (this.currentUser && (this.currentUser.username === data.article.user.username)) {
	        this.isCurrentUser = true;
	      } else {
	        this.isCurrentUser = false;
	      }
	      if (this.article.count_comment <= 5) {
	      	this.isViewAllComment = true;
	      } else {
	      	this.isViewAllComment = false;
	      }
			});
		});
	}
	ngOnDestroy() {
		this.param.unsubscribe();
	}
	keyHandle(e: any) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault('Enter');
			this.sendComment();
		}
	}
	
	sendComment() {
		this._apiService.createComment(this.article.slug, this.inputComment)
		.subscribe((data: any) => {
			if (data.comment) {
				this.article.comments.push(data.comment);
				this._router.navigate(['/article', this.article.slug]);
				this.inputComment = '';
			} else {
				alert(data.errors);
			}
		});
	}
	viewAllComments() {
		this._apiService.getComments(this.article.slug)
		.subscribe((data: any) => {
			this.article.comments = data.comments.reverse();
		});
		this.isViewAllComment = true;
	}
	editComment(id: number) {
		if (this.idComment === 0 || this.idComment !== id) {
			this.idComment = id;
		} else {
			this.idComment = 0;
		}
	}
	resultEditComment(obj: any) {
		if (obj.type === 'update') {
			for (var comment of this.article.comments) {
				if (comment.id === obj.id) {
					comment.content = obj.content;
					break;
				}
			}
		} else if (obj.type === 'delete') {
			var index = this.article.comments.indexOf((item: any) => {
				item.id === obj.id
			});
			this.article.comments.splice(index, 1);
		}
	}
	deleteArticle() {
		this._apiService.deleteArticle(this.article.slug)
		.subscribe((data: any) => {
			console.log(data);
		})
	}
}
