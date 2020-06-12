import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user.model";
import {TranslateService} from "@ngx-translate/core";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "../../../models/subject.model";
import {Group} from "../../../models/group.model";
import {MatDialog} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {GroupService} from "../../../services/group.service";
import {UserService} from "../../../services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  user: User;
  isShown: boolean = true;
  isSubjectTabs: boolean = false;
  isUsersTabs: boolean = false;
  isGroupTabs: boolean = true;
  selectedLang: string = "ru";
  selectedTab = 0;
  filterValue = "";


  public dataSourceGroup = new MatTableDataSource<Group>();
  public dataSourceUsers = new MatTableDataSource<User>();
  public dataSourceSubjects = new MatTableDataSource<Subject>();

  public displayedColumnsForGroupTable = ["group", "actions"];
  public displayedColumnsForSubjectTable = ["discipline", "group"];
  public displayedColumnsForUsersTable = ["login", "firstName", "lastName", "group"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private subjectService: SubjectService,
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.dataSourceUsers.paginator = this.paginator;
    this.dataSourceUsers.sort = this.sort;
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.selectedLang = window.localStorage.getItem('locale');
    this.translateService.use(this.selectedLang);
    this.subjectService.getAllSubject().subscribe(subjects => {
      this.dataSourceSubjects.data = subjects as Subject[]
    });

    this.groupService.getAllGroups().subscribe(group => {
      this.dataSourceGroup.data = group as Group[]
    });

    this.userService.getAllUsers().subscribe(user => {
      this.dataSourceUsers.data = user as User[]
    })

  }

  changeLocale(locale) {
    this.selectedLang = locale;
    window.localStorage.setItem('locale', locale);
    return this.translateService.use(locale);
  }

  toggleShow(event) {
    this.isShown = event;
  }

  clickOnRow(event, row) {
    this.selectedTab = 2;
    this.filterValue = row.name;
  }

  // openDialogForCreateSubject() {
  //   const dialogConfig = new MatDialogConfig();
  //
  //   dialogConfig.data = {
  //     id: 1,
  //     title: 'Angular For Beginners'
  //   };
  //
  //   const dialogRef = this.dialog.open(AddSubjectComponent, dialogConfig);
  //
  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       if (data != null) {
  //         this.add(data);
  //       }
  //     }
  //   );
  // }

  // openDialogForUpdateGroup(row) {
  //   const dialogConfig = new MatDialogConfig();
  //
  //   dialogConfig.data = {
  //     id: 1,
  //     title: 'Add'
  //   };
  //
  //   const dialogRef = this.dialog.open(UpdateSubjectComponent, dialogConfig);
  //
  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       if (data != null) {
  //         const subject: Subject = new Subject();
  //         subject.id = row.id;
  //         subject.discipline = data.name;
  //         this.subjectService.updateSubject(subject).subscribe(s => this.loadData());
  //       }
  //     }
  //   );
  // }


  changeToSubjectTable() {
    this.isGroupTabs = false;
    this.isSubjectTabs = true;
    this.isUsersTabs = false;
  }

  changeToGroupTable() {
    this.isGroupTabs = true;
    this.isSubjectTabs = false;
    this.isUsersTabs = false;
  }

  changeToUserTable() {
    this.isGroupTabs = false;
    this.isSubjectTabs = false;
    this.isUsersTabs = true;
  }

  addGroup(data) {
    const subject: Subject = new Subject();
    subject.discipline = data.name;
    subject.groupId = data.group.id;
    subject.group = data.group.name;
    subject.teacherId = this.user.id;

    // this.subjectService.createSubject(subject).subscribe(s => this.loadData());
  }

  delete(row) {
    if (confirm("Are you sure to delete subject: " + row.discipline)) {
      // this.subjectService.deleteSubject(row.id).subscribe(s => this.loadData());
    }
  }

  applyFilter(value: string) {
    this.filterValue=value;
    this.dataSourceUsers.filter = value.trim().toLowerCase();
  }
}
