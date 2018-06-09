import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Order } from '../_models/index';

@Injectable()
export class GroupService {
    constructor(private http: HttpClient) { }

    getAllOrderByUserId(userId:number) {
        return this.http.post<Order[]>(appConfig.apiUrl + 'orders/getAllOrderByUserId',{userId:userId});
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + 'users/' + _id);
    }

    createOrder(order: Order) {
        return this.http.post(appConfig.apiUrl + 'orders/createOrder', order);
    }

    updateOrder(order: Order) {
        return this.http.post(appConfig.apiUrl + 'orders/updateOrder', order);
    }
}