import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "../../../models/subject.model";
import {SubjectService} from "../../../services/subject.service";
import {Router} from "@angular/router";
import {JournalService} from "../../../services/journal.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddSubjectComponent} from "../dialog/add-subject/add-subject.component";
import {SelectionModel} from "@angular/cdk/collections";
import {UpdateSubjectComponent} from "../dialog/update-subject/update-subject.component";
import {EditProfileComponent} from "../dialog/edit-profile/edit-profile.component";
import {UserService} from "../../../services/user.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  selectedLang: string = "ru";
  isSelectedSubject: boolean = true;
  user: User;
  isShown: boolean = true;
  selection = new SelectionModel<Subject>(true, []);


  public dataSource = new MatTableDataSource<Subject>();
  public displayedColumns = [ "discipline", "group", "actions"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private journalService: JournalService,
    private router: Router,
    private subjectService: SubjectService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.translateService.use(environment.defaultLocale);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.selectedLang = window.localStorage.getItem('locale');
    this.loadSubject();
  }

  clickOnRow(row) {
    this.isSelectedSubject = false;
    this.router.navigateByUrl('/subjects/' + row.id + "/group/" + row.groupId);
  }

  private loadSubject(): void {
    this.loadData();
  }

  loadData() {
    if(this.user.role.name == "TEACHER") {
      this.subjectService.getSubjectByTeacherId(this.user.id).subscribe(subject => {
        this.dataSource.data = subject as Subject[];
      })
    }
    if(this.user.role.name == "STUDENT" || this.user.role.name == "HEAD_STUDENT"){
      this.subjectService.getSubjectByStudentId(this.user.id).subscribe(subject => {
        this.dataSource.data = subject as Subject[];
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleShow(event) {
    this.isShown = event;
  }

  openDialogForCreateSubject() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(AddSubjectComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          this.add(data);
        }
      }
    );
  }

  openDialogForUpdateSubject(row) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(UpdateSubjectComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          const subject: Subject = new Subject();
          subject.id = row.id;
          subject.discipline = data.name;
          this.subjectService.updateSubject(subject).subscribe(s => this.loadData());
        }
      }
    );
  }

  openDialogForEditProfile() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(EditProfileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.userService.updateUser(this.user).subscribe(s => window.localStorage.setItem('user', JSON.stringify(this.user)));
        }
      }
    );
  }

  add(data) {
    const subject: Subject = new Subject();
    subject.discipline = data.name;
    subject.groupId = data.group.id;
    subject.group = data.group.name;
    subject.teacherId = this.user.id;

    this.subjectService.createSubject(subject).subscribe(s => this.loadData());
  }

  delete(row) {
    if(confirm("Are you sure to delete subject: " + row.discipline)) {
      this.subjectService.deleteSubject(row.id).subscribe(s => this.loadData());
    }
  }

  changeLocale(locale){
    window.localStorage.setItem('locale', locale);
    this.selectedLang = locale;
    return this.translateService.use(locale);
  }


}
