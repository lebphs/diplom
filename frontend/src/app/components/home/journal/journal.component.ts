import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JournalService} from "../../../services/journal.service";
import {Journal} from "../../../models/journal.model";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {UserTable} from "../../../models/user-table.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddLessonComponent} from "../dialog/add-lesson/add-lesson.component";
import {EditProfileComponent} from "../dialog/edit-profile/edit-profile.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as XLSX from 'xlsx';
import {FileService} from "../../../services/file.service";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public dataSource = new MatTableDataSource<UserTable>();
  public columns = ['position', 'firstName', "lastName"];
  public headers: Array<string> = ["No", "firstNameHeader", "lastNameHeader"];

  public displayedColumns;
  public displayedHeaders;

  isShown: boolean = true;
  subjectId: string;
  groupId: number;
  user: User;

  journal: Journal[];
  students: Array<UserTable> = new Array<UserTable>();
  controls: FormArray;

  days: string[];
  daysColumns: string[];

  constructor(
    private fileService: FileService,
    private journalService: JournalService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public datepipe: DatePipe,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.subjectId = this.activatedRoute.snapshot.params['subjectId'];
    this.groupId = this.activatedRoute.snapshot.params['groupId'];
    this.loadData();


  }

  loadData() {
    if (this.user.role.name == "TEACHER")
      this.userService.getStudentByGroupId(this.groupId)
        .subscribe(student => {
          this.journalService.getJournalBySubjectId(this.subjectId)
            .subscribe(journal => {
              this.journal = journal as Journal[];
              this.mapJournal(student, journal);
            })
        });
    if (this.user.role.name == "STUDENT") {
      this.journalService.getJournalBySubjectId(this.subjectId)
        .subscribe(journal => {
          this.journal = journal as Journal[];
          this.mapJournal(Array.of(this.user), journal);
        })
    }

  }

  mapJournal(user: User[], journal: Journal[]) {
    this.days = Array.from(new Set(journal.map(j => this.datepipe.transform(j.classDate, 'yyyy-MM-dd')).sort()));

    this.daysColumns = [];
    this.displayedHeaders = [];
    this.days.map(d => {
      this.daysColumns.push(d + "_mark");
      this.daysColumns.push(d + "_truancy");
    });

    this.displayedColumns = this.columns.concat(this.daysColumns);
    this.displayedHeaders = this.displayedHeaders.concat(this.headers);
    this.days.map(d => this.displayedHeaders.push(d + "_header"));
    this.displayedColumns.push("mark");
    this.displayedColumns.push("truancy");
    this.displayedHeaders.push("header");

    this.students = new Array<UserTable>();
    user.forEach(u => {
      var marks = new Map(this.days.map(d => [d, this.getMarks(u.id, journal, d)]));
      var truancies = new Map(this.days.map(d => [d, this.getTruancies(u.id, journal, d)]));
      var userTable = new UserTable(u.id, u.firstName, u.lastName, marks, truancies);
      this.students.push(userTable);
    });
    this.dataSource.data = this.students;
    this.fillFormData(this.students);
  }


  getMarks(studentId, journal: Journal[], d) {
    const j = journal.filter(j => j.studentId == studentId && this.convertDateToString(j.classDate) == d);
    if (Array.isArray(j) && j.length < 1) {
      return "-";
    } else if (j[0].mark != null) {
      return j[0].mark.toString();
    }
    return "-";
  }

  getTruancies(studentId, journal: Journal[], d) {
    const j = journal.filter(j => j.studentId == studentId && this.convertDateToString(j.classDate) == d);
    if (Array.isArray(j) && j.length < 1) {
      return "-";
    } else if (j[0].truancy != null) {
      return j[0].truancy.toString();
    }
    return "-";
  }


  fillFormData(students: Array<UserTable>) {
    const formGroups = students.map(s => {
      const formGroup = new FormGroup({});
      this.daysColumns.map(d => {
        if (d.includes("mark")) {
          formGroup.registerControl(d, new FormControl(s.marks.get(d.replace("_mark", ""))));
        } else {
          formGroup.registerControl(d, new FormControl(s.truancies.get(d.replace("_truancy", ""))));
        }
      });
      return formGroup;
    });
    this.controls = new FormArray(formGroups);
  }

  convertDateToString(date: Date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }


  updateField(student: UserTable, index, field) {
    var date: string;
    var mark: string;
    var truancy: string;
    const control = this.getControl(index, field);
    if (control.valid && control.value != "-") {
      if (field.includes("mark")) {
        date = field.replace("_mark", "");
        mark = control.value
      } else {
        date = field.replace("_truancy", "");
        truancy = control.value
      }

      var journal: Journal[] = this.journal.filter(j => this.convertDateToString(j.classDate) == date && j.studentId == student.id);

      if (journal.length < 1) {
        this.add(date, mark, truancy, student.id);
      } else {
        if (mark != null || mark == "") {
          journal[0].mark = mark != "" ? mark : null;
        }
        if (truancy != null || truancy == "") {
          journal[0].truancy = truancy != "" ? truancy : null;
        }

        this.journalService.updateJournal(journal[0]).subscribe();
        this.loadData()
      }
    }

  }

  getControl(index, fieldName) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }


  toggleShow(event) {
    this.isShown = event;
  }


  openDialogForCreateLesson() {
    const dialogConfig = new MatDialogConfig();

    console.log("test");
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(AddLessonComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      date => {
        if (date instanceof Date) {
          this.add(date, null, null, null);
        }
      }
    );
  }

  add(date, mark, truancy, student) {
    const newJournal: Journal = new Journal();
    newJournal.subjectId = this.subjectId;
    newJournal.classDate = date;
    if (mark != null) {
      newJournal.mark = mark != "" ? mark : null;
    }
    if (truancy != null) {
      newJournal.truancy = truancy != "" ? truancy : null;
    }
    mark != null ? newJournal.mark = mark : newJournal.truancy = truancy;
    newJournal.studentId = student;
    this.journalService.createJournal(newJournal).subscribe(o => {
      this.loadData();
    });
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

  getAvgMarks(element: UserTable) {
    var sum = 0;
    var n = 0;
    element.marks.forEach((k, v) => {

      if (k != null && k != "-") {
        sum += +k;
        n++;
      }
    });
    return n != 0 ? Math.round(sum/n * 100) / 100 : 0;
  }

  getAllTruancy(element: UserTable) {
    var sum = 0;
    element.truancies.forEach((k, v) => {
      if (k != null && k != "-") {
        sum += +k;
      }
    });
    return sum;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  fileName= 'ExcelSheet.xlsx';

  exportToExcel(): void
  {
    /* table id is passed over here */
    let element = document.getElementById('journalTable');
    this.fileService.exportToExcel(element);

  }


}
