import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HeaderLayoutComponent } from './layouts/header/header.component';
import { FooterLayoutComponent } from './layouts/footer/footer.component';
import { AvatarPipe } from './share/pipes/avatar.pipe';
import { FullNamePipe } from './share/pipes/fullname.pipe';
import { UserService } from './share/services/user.service';
import { UserProfileService } from './share/services/userprofile.service';
import { ArticleService } from './share/services/article.service';
import { ArticlesListService } from './share/services/articleslist.service';
import { TagsListService } from './share/services/tagslist.service';
import { CategoriesService } from './share/services/categorieslist.service';

import { AppComponent }  from './app.component';
import { HomePageComponent }  from './pages/home/home.component';
import { ArticlePageComponent }  from './pages/article/article.component';
import { LoginPageComponent }  from './pages/login/login.component';
import { SignUpPageComponent }  from './pages/signup/signup.component';
import { ProfilePageComponent }  from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignUpPageComponent },
  { path: 'article', component: ArticlePageComponent },
  { path: 'profile', component: ProfilePageComponent }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,

    // share component
    HeaderLayoutComponent,
    FooterLayoutComponent,
    AvatarPipe,
    FullNamePipe,

    // pages component
    HomePageComponent,
    ArticlePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    ProfilePageComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    UserService,
    UserProfileService,
    ArticleService,
    ArticlesListService,
    TagsListService,
    CategoriesService
  ]
})

export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule)
  // .catch((err: any) => console.error(err));
