import {Subjects} from "./subjects.model";

export class Journal {
  constructor(
    public id: string,
    public subject: Subjects,
    public mark: number,
    public truancy: number,
    public comment: string
  ) {
  }

}

