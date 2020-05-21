import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {JournalService} from "../../services/journal.service";
import {JournalComponent} from "./journal/journal.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddLessonComponent} from "./dialog/add-lesson/add-lesson.component";
import {ActivatedRoute} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(SidebarComponent, {static: false}) child:SidebarComponent;

  private isShown: boolean = true;
  user: User;

  constructor(public dialog: MatDialog,
              journalService: JournalService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  toggleShow(event) {
    this.isShown = event;
  }



  createLesson(event){
    console.log("success");
  }

}
