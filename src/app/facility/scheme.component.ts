import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import {AlertService,UserService, FacilityService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'scheme.component.html'
})

export class SchemeComponent implements OnInit {
    currentUser: User;
    constructor(
    private userService: UserService,
    private facilityService: FacilityService,
    private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        
    }

    
    private submitLoanEnquiry(){
    
    }

    private submitInsuranceEnquiry() {
    
    }
}