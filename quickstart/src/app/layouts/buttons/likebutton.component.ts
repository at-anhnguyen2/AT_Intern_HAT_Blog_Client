import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './likebutton.html'
})

export class LikeButtonComponent {
  @Input() value: boolean = false;
  @Input() count: number = 0;
  isLiked: boolean;
  countLike: number;
  constructor() {
  	this.isLiked = false;
  	this.countLike = 0;
  }
  ngOnChanges() {
  	this.isLiked = this.value;
  	this.countLike = this.count;
  }
}
