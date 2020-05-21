import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GroupService} from "../../../../services/group.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form: FormGroup;
  description:string;
  title:string;


  constructor(
    private groupService: GroupService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.title = data.title;
  }

  ngOnInit() {

    this.form = this.fb.group({
      firstName: ["", []],
      lastName: ["", []],
    });

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
