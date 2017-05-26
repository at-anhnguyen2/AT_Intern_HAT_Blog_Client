import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ArticleService } from '../../share/services/article.service';
import { TagsListService } from '../../share/services/tagslist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomePageComponent  {
  public navIsFixed: boolean = false;
  total: number = 0;
  limit: number = 0;
  totalPages: number = 0;
  arrayArticles: any;
  arrayFavoriteArticles: any;
  arrayTags: any;
  apiUrl: string;
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _articleService: ArticleService,
    private _tagsListService: TagsListService
  ) {
    this.apiUrl = 'http://172.17.19.122:3000';
    this._articleService.getArticles()
    .subscribe((data: any) => {
      this.total = data.meta.total;
      this.limit = data.meta.limit;
      this.arrayArticles = data.articles;
      this.totalPages = this.total / this.limit;
    });
    this._articleService.getFavoriteArticles()
    .subscribe((data: any) => {
      this.arrayFavoriteArticles = data.articles;
    });
    this._tagsListService.getTags()
    .subscribe((data: any) => {
      this.arrayTags = data.tags;
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this._document.body.scrollTop;
    if (number > 200) {
      this.navIsFixed = true;
    } else {
      this.navIsFixed = false;
    }
  }

  goToPageNumber(number: number) {
    console.log(number);
    console.log("abc");
  }
}