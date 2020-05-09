import {Role} from "./role.model";
import {Group} from "./group.model";

export class User {
  constructor(
    public id: string,
    public login: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public patronymic?: string,
    public role?: Role,
    public group?: Group
  ) {
  }

}

