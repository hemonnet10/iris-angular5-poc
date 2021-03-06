﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { User } from '../_models/index';

@Component({
   selector: 'app-login',
    moduleId: module.id,
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                user => {
                this.loading = false;
                if(!user){
                 this.alertService.error('Invalid user');
                    this.loading = false;
                    return;
                }
                /*if((this.returnUrl=='login' || this.returnUrl=='/') && user.role.id==1)
                this.returnUrl='earn';
                else if((this.returnUrl=='login' || this.returnUrl=='/') && user.role.id==2)
                this.returnUrl='search';*/
                
                    this.router.navigate([this.returnUrl]);
                    
                },
                error => {
                    this.alertService.error(error.error);
                    this.loading = false;
                });
    }
}
