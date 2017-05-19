import { Component } from '@angular/core';
import { ArticleService } from '../../share/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.html'
})

export class ArticlePageComponent  {
	article: any;
	arrayPopularArticles: any;
	constructor(
		private _articleService: ArticleService,
	) {
		this._articleService.getArticle()
		.subscribe((data: any) => {
			this.article = data.article;
		});
		this._articleService.getPopularArticles()
		.subscribe((data: any) => {
			this.arrayPopularArticles = data.articles;
		});
	}
}
