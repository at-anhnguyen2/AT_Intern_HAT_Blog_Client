import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HeaderLayoutComponent } from './layouts/header/header.component';
import { FooterLayoutComponent } from './layouts/footer/footer.component';
import { LikeButtonComponent } from './layouts/buttons/likebutton.component';
import { FollowButtonComponent } from './layouts/buttons/followbutton.component';
import { MiniListArticlesComponent } from './layouts/articleslist/minilistarticles.component';
import { UserMediaComponent } from './layouts/usermedia/usermedia.component';
import { MessagesComponent } from './layouts/validationmessage/validationmessage.component';
import { AvatarPipe } from './share/pipes/avatar.pipe';
import { FullNamePipe } from './share/pipes/fullname.pipe';
import { ArrayNumberPipe } from './share/pipes/arraynumber.pipe';
import { ShortContentPipe } from './share/pipes/shortcontent.pipe';
import { UserService } from './share/services/user.service';
// import { UserProfileService } from './share/services/userprofile.service';
import { ArticleService } from './share/services/article.service';
import { TagsListService } from './share/services/tagslist.service';
import { CategoriesService } from './share/services/categorieslist.service';
import { ValidationService } from './share/services/validation.service';
import { AuthenticationService } from './share/services/authentication.service';

import { AppComponent }  from './app.component';
import { HomePageComponent }  from './pages/home/home.component';
import { ArticlePageComponent }  from './pages/article/article.component';
import { LoginPageComponent }  from './pages/login/login.component';
import { SignUpPageComponent }  from './pages/signup/signup.component';
import { ProfilePageComponent }  from './pages/profile/profile.component';
import { EditorPageComponent }  from './pages/editor/editor.component';
import { SettingPageComponent }  from './pages/setting/setting.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignUpPageComponent },
  { path: 'article/:id', component: ArticlePageComponent },
  { path: 'profile/:username', component: ProfilePageComponent },
  { path: 'editor', component: EditorPageComponent },
  { path: 'setting', component: SettingPageComponent },
  { path: 'api/v1/users/:confirm_token/confirm_email', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    CKEditorModule
  ],
  declarations: [
    AppComponent,

    // share component
    HeaderLayoutComponent,
    FooterLayoutComponent,
    LikeButtonComponent,
    FollowButtonComponent,
    MiniListArticlesComponent,
    UserMediaComponent,
    MessagesComponent,
    AvatarPipe,
    FullNamePipe,
    ArrayNumberPipe,
    ShortContentPipe,

    // pages component
    HomePageComponent,
    ArticlePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    ProfilePageComponent,
    EditorPageComponent,
    SettingPageComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    UserService,
    // UserProfileService,
    ArticleService,
    TagsListService,
    CategoriesService,
    ValidationService,
    AuthenticationService
  ]
})

export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch((err: any) => console.error(err));
