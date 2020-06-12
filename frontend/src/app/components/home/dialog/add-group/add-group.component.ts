import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Group} from "../../../../models/group.model";
import {GroupService} from "../../../../services/group.service";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {


  form: FormGroup;
  description:string;
  title:string;
  groups: Group[];


  constructor(
    private groupService: GroupService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.title = data.title;
  }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe(g=> this.groups = g as Group[]);

    this.form = new FormGroup({
      'number': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    });

  }

  save() {
    this.dialogRef.close(this.form.valid ? this.form.value : null);
  }

  close() {
    this.dialogRef.close();
  }

}
