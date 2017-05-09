import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderLayoutComponent } from './layouts/header/header.component';
import { FooterLayoutComponent } from './layouts/footer/footer.component';

import { HomePageComponent }  from './pages/home/home.component';
import { ArticlePageComponent }  from './pages/article/article.component';
import { LoginPageComponent }  from './pages/login/login.component';
import { SignUpPageComponent }  from './pages/signup/signup.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    HeaderLayoutComponent,
    FooterLayoutComponent,
    HomePageComponent,
    ArticlePageComponent,
    LoginPageComponent,
    SignUpPageComponent
  ],
  bootstrap:    [ ArticlePageComponent ]
})
export class AppModule { }
