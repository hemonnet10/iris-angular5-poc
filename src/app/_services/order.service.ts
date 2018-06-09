import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Order,Crop, Category,BaseModel, FarmerCrop } from '../_models/index';
import { OrderAssign } from "../_models/order.assign";

@Injectable()
export class OrderService {
    constructor(private http: HttpClient) { }

    getAllReceivedOrder(userId:number) {
        return this.http.get<Order[]>(appConfig.apiUrl + 'orders/getAllReceivedOrder/'+userId);
    }
  
  getAllOrders() {
        return this.http.get<Order[]>(appConfig.apiUrl + 'orders/getAllOrders');
    }
     getAllPlacedOrder(userId:number) {
        return this.http.get<Order[]>(appConfig.apiUrl + 'orders/getAllPlacedOrder/'+userId);
    }
    getAllCategories() {
        return this.http.get<Category[]>(appConfig.apiUrl + 'crop/getAllCropCategory/');
    }
    
     getCropByCategory(categoryId:number) {
        return this.http.get<Crop[]>(appConfig.apiUrl + 'crop/getCropByCategory/'+categoryId);
    }

   
    assignOrder(orderAssignList: OrderAssign[]) {
        return this.http.post<BaseModel>(appConfig.apiUrl + 'orders/assign', orderAssignList);
    }
  
   createOrder(order: Order) {
        return this.http.post<BaseModel>(appConfig.apiUrl + 'orders/create', order);
    }

    updateOrder(order: Order) {
        return this.http.post<BaseModel>(appConfig.apiUrl + 'orders/update', order);
    }
}