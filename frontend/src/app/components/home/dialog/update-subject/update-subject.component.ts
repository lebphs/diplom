import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Group} from "../../../../models/group.model";
import {GroupService} from "../../../../services/group.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {


  form: FormGroup;
  description:string;
  title:string;


  constructor(
    private groupService: GroupService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.title = data.title;
  }

  ngOnInit() {

    this.form = this.fb.group({
      name: ["", []],
    });

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}
