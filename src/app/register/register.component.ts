﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User,Role } from '../_models/index';


@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    user: User = new User();
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { 
        
        this.user.role=new Role();
        
        }

    register() {
        this.loading = true;
        this.userService.create(this.user)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', false);
                   this.loading = false;
                },
                error => {
                    this.alertService.error(error.error);
                    this.loading = false;
                });
    }
    
    validateOTP() {
        this.loading = true;
        this.userService.create(this.user)
            .subscribe(
                data => {
                    this.alertService.success('Your account is verified successfully', false);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    
}
