import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './likebutton.component.html'
})

export class LikeButtonComponent {
  @Input() value: boolean = false;
  @Input() count: number = 0;
  attentions: any;
  isLiked: boolean;
  countLike: number;
  constructor() {
    this.attentions = [];
  	this.isLiked = false;
  	this.countLike = 0;
  }
  ngOnChanges() {
  	this.countLike = this.count;
    this.attentions = this.value;
    this.attentions = this.attentions.filter((res: any) => {
      res.isLiked === true;
    })
    if (this.attentions.length === 0) {
      this.isLiked = false;
    } else {
      this.isLiked = true;
    }
  }
}
