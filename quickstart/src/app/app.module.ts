import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig } from './share/app.config';

import { HeaderLayoutComponent } from './layouts/header/header.component';
import { FooterLayoutComponent } from './layouts/footer/footer.component';
import { LikeButtonComponent } from './layouts/buttons/likebutton.component';
import { FollowButtonComponent } from './layouts/buttons/followbutton.component';
import { SubscribeButtonComponent } from './layouts/buttons/subscribebutton.component';
import { MiniListArticlesComponent } from './layouts/articleslist/minilistarticles.component';
import { UserMediaComponent } from './layouts/usermedia/usermedia.component';
import { MessagesComponent } from './layouts/validationmessage/validationmessage.component';
import { EditCommentComponent } from './layouts/editcomment/editcomment.component';
import { NotificationComponent } from './layouts/notification/notification.component';
import { AvatarPipe } from './share/pipes/avatar.pipe';
import { ImagePipe } from './share/pipes/image.pipe';
import { FullNamePipe } from './share/pipes/fullname.pipe';
import { ArrayNumberPipe } from './share/pipes/arraynumber.pipe';
import { ShortContentPipe } from './share/pipes/shortcontent.pipe';
import { SafePipe } from './share/pipes/safe.pipe';
import { APIService } from './share/services/api.service';
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
import { WelcomePageComponent }  from './pages/welcome/welcome.component';
import { AboutUsPageComponent }  from './pages/aboutus/aboutus.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignUpPageComponent },
  { path: 'article/:slug', component: ArticlePageComponent },
  { path: 'profile/:username', component: ProfilePageComponent },
  { path: 'editor', component: EditorPageComponent },
  { path: 'editor/:slug', component: EditorPageComponent },
  { path: 'settings', component: SettingPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'aboutus', component: AboutUsPageComponent },
  { path: 'http://172.17.19.153:3000/api/v1/authorizations/:confirm', redirectTo: 'home', pathMatch: 'full' }
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
    SubscribeButtonComponent,
    MiniListArticlesComponent,
    UserMediaComponent,
    MessagesComponent,
    EditCommentComponent,
    NotificationComponent,
    AvatarPipe,
    ImagePipe,
    FullNamePipe,
    ArrayNumberPipe,
    ShortContentPipe,
    SafePipe,

    // pages component
    HomePageComponent,
    ArticlePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    ProfilePageComponent,
    EditorPageComponent,
    SettingPageComponent,
    WelcomePageComponent,
    AboutUsPageComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    APIService,
    ValidationService,
    AuthenticationService,
    AppConfig
  ]
})

export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule)
  // .catch((err: any) => console.error(err));
