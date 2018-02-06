import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import  {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
      private _authService: AuthService,
      private _flashMessage: FlashMessagesService,
      private _router: Router   
  ) { }

  ngOnInit() {
  }

  onLogin(){
    let user = {
      username: this.username,
      password: this.password
    }

    this._authService.authenticateUser(user)
      .subscribe(data=>{
          if(data.success){
            this._authService.storeUserData(data.token,data.user);
            this._router.navigate(['dashboard']);
          }else{
            this._flashMessage.show(data.msg, {
              cssClass: 'alert alert-danger',
              timeout: 3000
            })
          }
      });
  }
}
