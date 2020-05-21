import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() show = new EventEmitter<boolean>();
  private isShown: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleShow() {
    this.show.emit(this.isShown = ! this.isShown);
  }

  onLogout() {
    window.localStorage.removeItem('user');
  }


}
