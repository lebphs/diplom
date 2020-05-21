import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error: string;
  status:string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.status = this.activatedRoute.snapshot.params['error'];
    this.error= this.recogniseError(this.status);
  }

  recogniseError(status: string): string {
    if (status == '204') return 'No content';
    if (status == '403') return 'Forbidden';
    if (status == '404') return 'Not found';
    if (status == '500') return 'Internal Server Error';
    if (status == '504') return 'Gateway Timeout';
    if (status == '409') return 'Conflict';
    if (status == '401') return 'Unauthorized';
    if (status == '400') return 'Bad Request';
    else return 'Unkown error on server';
  }

}
