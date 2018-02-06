import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import  {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public _authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  onLogout(){
      this._authService.logout();
      this._flashMessage.show("You are logged out!", {
        cssClass: 'alert alert-success',
        timeout: 3000
      });
      this._router.navigate(['login']);
  }

}
