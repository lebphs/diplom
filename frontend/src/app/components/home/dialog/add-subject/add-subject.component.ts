import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupService} from "../../../../services/group.service";
import {Group} from "../../../../models/group.model";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {


  form: FormGroup;
  description:string;
  title:string;
  groups: Group[];


  constructor(
    private groupService: GroupService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.title = data.title;
  }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(g=> this.groups = g as Group[]);

    this.form = this.fb.group({
      name: ["", []],
      group: ["", []]
    });

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}
