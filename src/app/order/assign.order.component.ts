import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User, Order, Category, Crop, OrderAssign} from '../_models/index';
import {AlertService, UserService, OrderService} from '../_services/index';
import {StatusFilterPipe} from '../filter/index';
@Component({
  moduleId: module.id,
  templateUrl: 'assign.order.component.html'
})

export class AssignOrderComponent implements OnInit {
  loading = false;
  currentUser: User;
  farmerId: number;
  orders: Order[] = [];
  eligibleFarmers: User;
  order: Order;
  orderAssign: OrderAssign;
  statusFilter: StatusFilterPipe = new StatusFilterPipe();
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllOrders();
  }


  private assignOrder(order: Order) {
    let orderAssignList:OrderAssign[]=[];
    let orderAssign:OrderAssign = new OrderAssign();
    orderAssign.orderId = order.id;
    orderAssign.userId = +order.orderReceivedBy;
     orderAssignList.push(orderAssign);
    
    
    this.order = new Order();
    this.order.id = order.id;
    this.order.status = 'Assigned';

    this.orderService.updateOrder(this.order).subscribe(
      response => {
        this.alertService.success(response.message);
        this.getAllOrders();
      });
    
    this.orderService.assignOrder(orderAssignList).subscribe(
      response => {
        this.alertService.success(response.message);
//        this.getAllOrders();
      });

  }

  private getAllOrders() {
    this.orderService.getAllOrders().subscribe(orders => {this.orders = orders;});
  }
  public getElibleFarmerForOrder(order: Order) {
    this.farmerId = null;

    this.userService.getElibleFarmerForOrder(order.crop.id).subscribe(eligibleFarmers => {
      order.eligibleFarmers = eligibleFarmers;
    });
  }
}