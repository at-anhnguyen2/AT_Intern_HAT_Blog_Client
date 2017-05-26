import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../share/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})

export class ArticlePageComponent  {
	article: any;
	arrayPopularArticles: any;
	apiURL: string = "http://172.17.19.122:3000";
	constructor(
		private _articleService: ArticleService,
		private _route: ActivatedRoute,
		private _router: Router
	) {	}

	ngOnInit() {
		let param = this._route.snapshot.params["slug"];
		console.log(param);
		this._articleService.getArticle(param)
		.subscribe((data: any) => {
			this.article = data.article;
		});
		this._articleService.getPopularArticles()
		.subscribe((data: any) => {
			this.arrayPopularArticles = data.articles;
		});
	}
}
