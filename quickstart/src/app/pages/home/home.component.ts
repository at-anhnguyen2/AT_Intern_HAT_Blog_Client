import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { APIService } from '../../share/services/api.service';
import { AppConfig } from '../../share/app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomePageComponent  {
  public navIsFixed: boolean = false;
  total: number = 0;
  limit: number = 10;
  totalPages: number = 0;
  arrayArticles: any;
  arrayCategories: any;
  arrayFavoriteArticles: any;
  arrayTags: any;
  currentUser: any;
  currentIDCategory: number;
  currentPageNumber: number;
  currentTagID: number;
  currentTag: string;
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _apiService: APIService,
    private _appConfig: AppConfig
  ) {
    this.currentUser = _appConfig.currentUser;
    this.currentIDCategory = 0;
    this.currentPageNumber = 1;
    this.currentTagID = 0;
    this.currentTag = "";
  }
  ngOnInit() {
    this._apiService.getArticles(this.limit, this.currentIDCategory, this.currentPageNumber, this.currentTagID)
    .subscribe((data: any) => {
      this.total = data.meta.total;
      this.arrayArticles = data.articles;
      this.totalPages = this.total / this.limit;
    });
    this._apiService.getCategories()
    .subscribe((data: any) => {
      this.arrayCategories = data.categories;
    });
    this._apiService.getFavoriteArticles()
    .subscribe((data: any) => {
      this.arrayFavoriteArticles = data.articles;
    });
    this._apiService.getTags()
    .subscribe((data: any) => {
      this.arrayTags = data.tags;
    });
  }
  getArticles() {
    this._apiService.getArticles(this.limit, this.currentIDCategory, this.currentPageNumber, this.currentTagID)
    .subscribe((data: any) => {
      this.total = data.meta.total;
      this.arrayArticles = data.articles;
      this.totalPages = this.total / this.limit;
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
    this.currentPageNumber = number;
    console.log(number);
    this.getArticles();
  }

  clickTag(number: number, name: string)
  {
    this.currentTagID = number;
    this.currentTag = name;
    this.currentPageNumber = 1;
    this.currentIDCategory = -1;
    this.getArticles();
  }
  clickCategory(number: number) {
    this.currentIDCategory = number;
    this.currentPageNumber = 1;
    this.currentTagID = 0;
    this.getArticles();
  }
  clickGlobal(){
    this.currentIDCategory = 0;
    this.currentPageNumber = 1;
    this.currentTagID = 0;
    this.getArticles();
  }
}