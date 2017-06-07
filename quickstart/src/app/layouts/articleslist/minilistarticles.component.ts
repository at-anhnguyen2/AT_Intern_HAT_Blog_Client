import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-minilist-articles',
  templateUrl: './minilistarticles.component.html'
})

export class MiniListArticlesComponent {
  @Input() inputArticles: any = null;
  arrayArticles: any;
  constructor() {
  	this.arrayArticles = null;
  }
  ngOnChanges() {
  	this.arrayArticles = this.inputArticles;
  }
}
