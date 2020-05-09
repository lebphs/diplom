import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserComponent} from './components/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {LoginComponent} from './components/auth/login/login.component';
import {AuthComponent} from './components/auth/auth.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoleService} from "./services/role.service";
import {DemoMaterialModule} from './material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    AuthComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, RoleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
