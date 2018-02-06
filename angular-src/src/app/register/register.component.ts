import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    name: string;
    email: string;
    username: string;
    password: string;


  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private _authService: AuthService,
              private _router: Router
            ) { }

  ngOnInit() {
  }

  onNewRegister(){
      let user ={
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      }
      if(!this.validateService.validateRegister(user)){
        this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please use a valid email',{cssClass: 'alert-danger', timeout:3000});
      }

      else{
      this._authService.registerUser(user)
          .subscribe(data=>{
            if(data.success){
                this.flashMessage.show('Congratulation! You are successfully registered. You can login now.'+data.success,
                      {cssClass: 'alert-success', timeout:3000});
                      this._router.navigate(['/login']);
            }
            else{
              this.flashMessage.show(
                'Sorry! Unable to create new account! Please try again',
                { cssClass: 'alert-warning', timeout:3000});
            }
          });
        }
 
    }



}
