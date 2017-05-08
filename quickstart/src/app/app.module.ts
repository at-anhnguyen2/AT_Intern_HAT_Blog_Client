import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent }  from './pages/home/home.component';
import { HeaderLayoutComponent } from './layouts/header/header.component';
import { FooterLayoutComponent } from './layouts/footer/footer.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    HomePageComponent, 
    HeaderLayoutComponent, 
    FooterLayoutComponent 
  ],
  bootstrap:    [ HomePageComponent ]
})
export class AppModule { }
