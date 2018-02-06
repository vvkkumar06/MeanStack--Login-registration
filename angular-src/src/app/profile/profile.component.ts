import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this._authService.getProfile()
      .subscribe(
        profile=>{
          this.user = profile.user;
        }
      )
  }

}
