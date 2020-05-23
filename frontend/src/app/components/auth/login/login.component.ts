import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  selectedLang: string = "ru";

  constructor(private userService: UserService,
              private translateService: TranslateService,
              private router: Router) {
  }


  ngOnInit() {
    this.selectedLang = window.localStorage.getItem('locale');
    this.translateService.use(this.selectedLang);
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    });
  }

  onSubmit() {
    const formData = this.form.value;

    this.userService.login(formData.login)
      .subscribe((user: User) => {
        if (user.password === formData.password) {
          window.localStorage.setItem('user', JSON.stringify(user));
          console.log(user.role.name);
          if (user.role.name === 'STUDENTS') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/subjects']);
          }
        }

      });
  }

  changeLocale(locale){
    window.localStorage.setItem('locale', locale);
    return this.translateService.use(locale);
  }

}
