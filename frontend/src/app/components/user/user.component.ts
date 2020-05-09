import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription, Observable} from "rxjs";
import {User} from "../../models/user.model";
import { MatTableDataSource } from '@angular/material';
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public dataSource = new MatTableDataSource<User>();

  public displayedColumns = ['login', 'firstName', "lastName", "role", "group"];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe(user => {
      this.dataSource.data = user as User[];
    })
  }

}
