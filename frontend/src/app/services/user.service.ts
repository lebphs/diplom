import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable()
export class UserService {
  private baseUrl: string = '/api/users';

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public login(login: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/login?login=' + login);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post <User>(this.baseUrl, user);
  }

}
