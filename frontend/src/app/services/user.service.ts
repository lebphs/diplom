import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

@Injectable()
export class UserService {
  private baseUrl: string = '/api/users';

  constructor(private router: Router,
              private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public getStudentByGroupId(groupId: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "/students?groupId=" + groupId);
  }

  public login(login: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/login?login=' + login);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl, user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user')).role.name === 'TEACHER') {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      });
      return false;
    }
  }

}
