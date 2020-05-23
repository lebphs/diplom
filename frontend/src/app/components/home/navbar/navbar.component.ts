import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() show = new EventEmitter<boolean>();
  private isShown: boolean = true;

  @Input() locale:string = "ru";

  constructor(private translateService:TranslateService) { }

  ngOnInit() {
    this.translateService.use(this.locale);
  }

  toggleShow() {
    this.show.emit(this.isShown = ! this.isShown);
  }

  onLogout() {
    window.localStorage.removeItem('user');
  }


}
