import { Component, OnInit } from '@angular/core';

import { User,UserRequest } from '../_models/index';
import {AlertService,UserService, FacilityService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'facility.component.html'
})

export class FacilityComponent implements OnInit {
  loading = false;
    currentUser: User;
    loanRequest:UserRequest;
    insuranceRequest:UserRequest;
    constructor(
    private userService: UserService,
    private facilityService: FacilityService,
    private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loanRequest= new UserRequest();
        this.insuranceRequest= new UserRequest();
    }

    
    public submitLoanEnquiry(){
            this.loading = true;
            this.loanRequest.userId=this.currentUser.id;
        this.userService.saveUserRequest(this.loanRequest)
            .subscribe(
                data => {
                    this.alertService.success('Request submitted successfully', true);
                     this.loanRequest= new UserRequest();
                   this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    
    }

    private submitInsuranceEnquiry() {
      this.loading = true;
        this.userService.saveUserRequest(this.insuranceRequest)
            .subscribe(
                data => {
                    this.alertService.success('Request submitted successfully', true);
                   this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    
    
    }
}