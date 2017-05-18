import { Component } from '@angular/core';
import { ArticleService } from '../../share/services/article.service';
import { PopularArticlesService } from '../../share/services/populararticles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.html'
})

export class ArticlePageComponent  {
	article: any;
	arrayPopularArticles: any;
	constructor(
		private _articleService: ArticleService,
		private _popularArticlesSerVice: PopularArticlesService
	) {
		this._articleService.getArticle()
		.subscribe((data: any) => {
			this.article = data.article;
			console.log(this.article);
		});
		this._popularArticlesSerVice.getArticles()
		.subscribe((data: any) => {
			this.arrayPopularArticles = data.articles;
		});
	}
}
