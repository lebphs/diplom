import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService,
              private router: Router) {
  }


  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(),
      'password': new FormControl(),
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

}
