import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {Role} from "../../../models/role.model";
import {RoleService} from "../../../services/role.service";
import {Group} from "../../../models/group.model";
import {GroupService} from "../../../services/group.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  selectedValue:Role;
  selectedLang: string = "ru";
  isShow:boolean;
  form:FormGroup;
  roles: Role[];
  groups: Group[];


  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private roleService: RoleService,
    private translateService: TranslateService,
    private router: Router  ) { }

  ngOnInit() {
    this.selectedLang = window.localStorage.getItem('locale');
    this.translateService.use(this.selectedLang);
    this.roleService.getAllRoles()
      .subscribe(role => {
        this.roles = role as Role[];
      });

    this.groupService.getAllGroups()
      .subscribe(group => {
        this.groups = group as Group[];
      });

    this.form = new FormGroup({
      'login': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'role': new FormControl(null, [Validators.required]),
      'group': new FormControl(null)
    });
  }

  onSubmit() {
    const {login, password, firstName, lastName, role, group} = this.form.value;
    const user = new User("", login, password, firstName, lastName, null, role, group);

    if(this.form.valid) {
      this.userService.createUser(user)
        .subscribe(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
            }
          });
        });
    }
  }

  changeOption(data){
    console.log(data);
    this.isShow = data.name == "STUDENT" || data.name == "HEAD_STUDENT";
  }

  changeLocale(locale){
    window.localStorage.setItem('locale', locale);
    return this.translateService.use(locale);
  }
}
