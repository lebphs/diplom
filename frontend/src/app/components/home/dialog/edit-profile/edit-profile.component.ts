import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

    this.form = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    });

  }

  save() {
    this.dialogRef.close(this.form.valid ? this.form.value : null);
  }

  close() {
    this.dialogRef.close();
  }
}
