import { Component, OnInit } from '@angular/core';


import {  AuthenticationService } from '../_services/index';
import { User } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
currentUser: User;
constructor(
    private authenticationService: AuthenticationService
        ) { 
         this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
        
    getRole(){
    return this.authenticationService.getRole();
    }

    ngOnInit() {}
}