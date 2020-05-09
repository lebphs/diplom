import {Disciplines} from "./disciplines.model";
import {Group} from "./group.model";
import {User} from "./user.model";

export class Subjects {
  constructor(
    public id: number,
    public discipline: Disciplines,
    public group: Group,
    public teacher: User
  ) {
  }

}

