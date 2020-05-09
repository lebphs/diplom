import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../models/role.model";

@Injectable()
export class RoleService {
  private baseUrl: string = '/api/roles';

  constructor(private http: HttpClient) {
  }

  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }

}
