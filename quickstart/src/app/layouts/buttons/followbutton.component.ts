import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './followbutton.html'
})

export class FollowButtonComponent {
  @Input() value: boolean = false;
  isFollowed: boolean;
  constructor() {
  	this.isFollowed = false;
  }
  ngOnChanges() {
  	this.isFollowed = this.value;
  }
}
