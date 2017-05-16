import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ArticlesListService } from '../../share/services/articleslist.service';
import { FavoriteArticlesService } from '../../share/services/favoritearticles.service';
import { TagsListService } from '../../share/services/tagslist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})

export class HomePageComponent  {
  public navIsFixed: boolean = false;
  total: number = 0;
  limit: number = 0;
  totalPages: number = 0;
  arrayArticles: any;
  arrayFavoriteArticles: any;
  arrayTags: any;
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _articlesListService: ArticlesListService,
    private _favoriteArticles: FavoriteArticlesService,
    private _tagsListService: TagsListService
  ) {
    this._articlesListService.getArticles()
    .subscribe((data: any) => {
      this.total = data.meta.total;
      this.limit = data.meta.limit;
      this.arrayArticles = data.articles;
      this.totalPages = this.total / this.limit;
    });
    this._favoriteArticles.getArticles()
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

}