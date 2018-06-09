import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Order, Category, Crop } from '../_models/index';
import {AlertService,UserService, OrderService } from '../_services/index';
import { StatusFilterPipe} from '../filter/index';
@Component({
    moduleId: module.id,
    templateUrl: 'order.component.html'
})

export class OrderComponent implements OnInit {
    currentUser: User;
    orders: Order[] = [];
	order:Order;
	 statusFilter: StatusFilterPipe = new StatusFilterPipe();
    constructor(
    private userService: UserService,
    private orderService: OrderService,
       private router: Router,
    private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getAllReceivedOrder(this.currentUser.id);
    }

    
    private acceptOrder(orderId:number){
    this.order= new Order();
    this.order.id=orderId;
    this.order.status='Accepted';
        this.orderService.updateOrder(this.order).subscribe(
        response => { 
        this.alertService.success('Order Accepted Successfully.');
          this.getAllReceivedOrder(this.currentUser.id);
         });
    
    }

    private getAllReceivedOrder(userId:number) {
        this.orderService.getAllReceivedOrder(userId).subscribe(orders => { this.orders = orders; });
    }
}