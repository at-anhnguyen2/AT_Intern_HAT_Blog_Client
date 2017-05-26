import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './followbutton.component.html'
})

export class FollowButtonComponent {
  @Input() value: any = [];
  attentions: any;
  isFollowed: boolean;
  constructor() {
  	this.isFollowed = false;
    this.attentions = [];
  }
  ngOnChanges() {
  	this.attentions = this.value;
    this.attentions = this.attentions.filter((res: any) => {
      res.isFollowed === true;
    })
    if (this.attentions.length === 0) {
      this.isFollowed = false;
    } else {
      this.isFollowed = true;
    }
  }
}
