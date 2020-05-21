import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {SubjectsComponent} from "./components/home/subjects/subjects.component";
import {JournalComponent} from "./components/home/journal/journal.component";

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},
  {path: 'subjects', component: SubjectsComponent, },
  {path:'subjects/:subjectId/group/:groupId',component:JournalComponent},
  {path: '', component: SubjectsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
