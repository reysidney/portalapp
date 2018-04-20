import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;
    timeout: Number = 2000;

    constructor(
        private authService: AuthService, 
        private validateService: ValidateService, 
        private flashMessage: FlashMessagesService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    onLoginSubmit() {
        const user = {
            username : this.username,
            password : this.password
        }

        // Required Fields
        if(!this.validateService.validateLogin(user)) {
            this.flashMessage.show('fill up all fields', { cssClass: 'alert-danger', timeout: this.timeout});
            return false;
        }

        // Login User
        this.authService.authenticateUser(user).subscribe(data => {
            if(data.success) {
                this.authService.storeUserData(data.token, data.user);
                this.flashMessage.show(data.message, { cssClass: 'alert-success', timeout: this.timeout});
                this.router.navigate(['dashboard']);
            } else {
                this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: this.timeout});
                this.router.navigate(['login']);
            }
        });
    }

}
