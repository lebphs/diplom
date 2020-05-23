import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserComponent} from './components/home/user/user.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoleService} from "./services/role.service";
import {DemoMaterialModule} from './material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorComponent, MissingTranslationService} from './components/error/error.component';
import { SubjectsComponent } from './components/home/subjects/subjects.component';
import {SubjectService} from "./services/subject.service";
import { JournalComponent } from './components/home/journal/journal.component';
import {JournalService} from "./services/journal.service";
import {DatePipe} from "@angular/common";
import { EditModeDirective } from './components/home/editable/edit-mode.directive';
import { EditOnEnterDirective } from './components/home/editable/edit-on-enter.directive';
import { EditableComponent } from './components/home/editable/editable/editable.component';
import { ViewModeDirective } from './components/home/editable/view-mode.directive';
import { FocusableDirective } from './components/home/editable/focusable.directive';
import { AddLessonComponent } from './components/home/dialog/add-lesson/add-lesson.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { AddSubjectComponent } from './components/home/dialog/add-subject/add-subject.component';
import {GroupService} from "./services/group.service";
import { UpdateSubjectComponent } from './components/home/dialog/update-subject/update-subject.component';
import { EditProfileComponent } from './components/home/dialog/edit-profile/edit-profile.component';
import {FileService} from "./services/file.service";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    SubjectsComponent,
    JournalComponent,
    EditModeDirective,
    EditOnEnterDirective,
    EditableComponent,
    ViewModeDirective,
    FocusableDirective,
    AddLessonComponent,
    NavbarComponent,
    AddSubjectComponent,
    UpdateSubjectComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    })
  ],
  providers: [
    UserService,
    RoleService,
    SubjectService,
    JournalService,
    GroupService,
    DatePipe,
    FileService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddLessonComponent,
    AddSubjectComponent,
    UpdateSubjectComponent,
    EditProfileComponent
  ]
})
export class AppModule {
}
