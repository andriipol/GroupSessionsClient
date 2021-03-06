import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeroComponent} from './components/hero/hero.component';
import {LoadingComponent} from './components/loading/loading.component';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HomeContentComponent} from './components/home-content/home-content.component';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {GroupSessionsApiComponent} from './pages/groups-api/group-sessions-api.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';

import {AuthModule} from '@auth0/auth0-angular';
import {environment as env} from '../environments/environment';
import {LoginButtonComponent} from './components/login-button/login-button.component';
import {SignupButtonComponent} from './components/signup-button/signup-button.component';
import {LogoutButtonComponent} from './components/logout-button/logout-button.component';
import {AuthenticationButtonComponent} from './components/authentication-button/authentication-button.component';
import {AuthNavComponent} from './components/auth-nav/auth-nav.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthHttpInterceptor} from '@auth0/auth0-angular';
import {AddSessionComponent} from './components/add-session/add-session.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HabitsApiComponent} from './pages/habits-api/habits-api.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthenticationCallbackActivateGuard} from './AuthenticationCallbackActivateGuard';
import { AddHabitComponent } from './components/add-habit/add-habit.component';
import { AgmCoreModule } from '@agm/core';
import { DetailsSessionComponent } from './components/details-session/details-session.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeroComponent,
    HomeContentComponent,
    LoadingComponent,
    MainNavComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    GroupSessionsApiComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    AuthNavComponent,
    AddSessionComponent,
    HabitsApiComponent,
    AddHabitComponent,
    DetailsSessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: `${env.dev.mapsApiKey}`
    }),
    // 👇 update AuthModule
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [`${env.dev.serverUrl}/api/sessions*`, `${env.dev.serverUrl}/api/habits*`],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    // {provide: AuthenticationCallbackActivateGuard}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
