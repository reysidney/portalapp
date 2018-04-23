import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, Route } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    user: Object;

    constructor(
        private authService: AuthService, 
        private flashMessage: FlashMessagesService,
        private router: Router,
        private titleService: Title 
    ) 
    { 
        this.titleService.setTitle("Portal App | User Profile");
    }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.user = profile.user;
        }, err => {
            console.log(err);
            return false;
        });
    }

}
