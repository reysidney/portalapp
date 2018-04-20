import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, Route } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    name : String;
    username : String;
    email : String;
    password : String;
    timeout: Number = 2000;

    constructor(
        private authService: AuthService, 
        private validateService: ValidateService, 
        private flashMessage: FlashMessagesService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    onRegisterSubmit() {
        const user = {
            name : this.name,
            username : this.username,
            email : this.email,
            password : this.password
        }

        // Required Fields
        if(!this.validateService.validateRegister(user)) {
            this.flashMessage.show('fill up all fields', { cssClass: 'alert-danger', timeout: this.timeout});
            return false;
        }

        // Validate Email
        if(!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('invalid email', { cssClass: 'alert-danger', timeout: this.timeout});
            return false;
        }

        // Register User
        this.authService.registerUser(user).subscribe(data => {
            if(data.success) {
                this.flashMessage.show(data.message, { cssClass: 'alert-success', timeout: this.timeout});
                this.router.navigate(['login']);
            } else {
                this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: this.timeout});
                this.router.navigate(['register']);
            }
        });
    }
}
