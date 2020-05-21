import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddLessonComponent} from "../dialog/add-lesson/add-lesson.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private isShown: boolean = true;

  @Input() user: User;
  @Output() lesson = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog,) { }

  ngOnInit() {
  }


  toggleShow() {
    this.isShown = ! this.isShown;
  }

  onClick(){

  }

  openDialog(test) {
    console.log(test);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(AddLessonComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data );
        this.createLesson(data);
      }

    );
  }

  createLesson(data){
    this.lesson.emit(data);
  }
}
