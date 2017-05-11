import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})

export class HomePageComponent  { 
  public navIsFixed: boolean = false;
  constructor(@Inject(DOCUMENT) private _document: Document) {}

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