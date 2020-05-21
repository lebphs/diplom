import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {JournalService} from "../../../../services/journal.service";

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {


  form: FormGroup;
  description:string;
  title:string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddLessonComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.title = data.title;
  }

  ngOnInit() {
    this.form = this.fb.group({
      lessonDate: ["", []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value.lessonDate);
  }

  close() {
    this.dialogRef.close();
  }

}
