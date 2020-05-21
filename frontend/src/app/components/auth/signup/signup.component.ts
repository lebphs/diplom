import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {Role} from "../../../models/role.model";
import {RoleService} from "../../../services/role.service";
import {Group} from "../../../models/group.model";
import {GroupService} from "../../../services/group.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  selectedValue:Role;
  isShow:boolean;
  form:FormGroup;
  roles: Role[];
  groups: Group[];


  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router  ) { }

  ngOnInit() {
    this.roleService.getAllRoles()
      .subscribe(role => {
        this.roles = role as Role[];
      });

    this.groupService.getAllGroups()
      .subscribe(group => {
        this.groups = group as Group[];
      });

    this.form = new FormGroup({
      'login': new FormControl(),
      'password': new FormControl(),
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'role': new FormControl(),
      'group': new FormControl()
    });
  }

  onSubmit() {
    const {login, password, firstName, lastName, role, group} = this.form.value;
    const user = new User("", login, password, firstName, lastName, null, role, group);

    this.userService.createUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  changeOption(data){
    console.log(data);
    this.isShow = data.name == "STUDENT";
  }

}
