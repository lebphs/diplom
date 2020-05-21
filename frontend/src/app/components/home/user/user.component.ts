import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public dataSource = new MatTableDataSource<User>();
  public displayedColumns = ['login', 'firstName', "lastName", "role", "group"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe(user => {
      this.dataSource.data = user as User[];
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

// export class UserDataSource implements DataSource<User> {
//
//   private userSubject = new BehaviorSubject<User[]>([]);
//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   public loading$ = this.loadingSubject.asObservable();
//
//   constructor(private userService: UserService, private paginator: MatPaginator, private router: Router) {
//
//   }
//
//   connect(collectionViewer: CollectionViewer): Observable<User[]> {
//     return this.userSubject.asObservable();
//   }
//
//   disconnect(collectionViewer: CollectionViewer): void {
//     this.userSubject.complete();
//     this.loadingSubject.complete();
//   }
//
//   loadUsers() {
//     this.loadingSubject.next(true);
//     this.userSubject.next([]);
//     timer(500).subscribe(
//       val => {
//         this.userService.getAllUsers()
//           .pipe(
//             catchError((error) => this.router.navigateByUrl('/error/' + error.status)),
//             finalize(() => this.loadingSubject.next(false))
//           )
//           .subscribe(page => {
//             this.paginator.length = page['totalElements'];
//             this.userSubject.next(page['content'])
//           });
//
//         // getPageOfTasksForUser(type, fieldSort, directionSort, page, size, search, idProject).pipe(
//         //   catchError((error) => this.router.navigateByUrl('/error/' + error.status)),
//         //   finalize(() => this.loadingSubject.next(false))
//         // ).subscribe(
//         //   page => {
//         //     this.paginator.length = page['totalElements'];
//         //     this.tasksSubject.next(page['content'])
//         //   }
//         // )
//       }
//     )
//   }
// }
