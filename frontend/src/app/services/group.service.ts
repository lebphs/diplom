import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../models/group.model";

@Injectable()
export class GroupService {

  private baseUrl: string = '/api/groups';

  constructor(private http: HttpClient) {
  }

  public getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }
}
