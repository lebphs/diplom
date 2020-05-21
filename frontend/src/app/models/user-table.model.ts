export class UserTable {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,

    public marks: Map<string, string>,
    public truancies: Map<string, string>
  ) {
  }

}

