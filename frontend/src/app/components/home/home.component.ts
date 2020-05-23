import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {JournalService} from "../../services/journal.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
