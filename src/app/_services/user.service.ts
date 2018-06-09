import { BaseModel } from "../_models/base";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User,FarmerDetail,UserRequest, FarmerCrop } from '../_models/index';


@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + 'users/all');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + 'users/' + _id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + 'users/create', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + 'users/' + user.id, user);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + 'users/' + _id);
    }
    
    saveFarmerDetail(farmerDetail: FarmerDetail) {
        return this.http.post<User>(appConfig.apiUrl + 'users/saveFarmerDetail', farmerDetail);
    }
   saveFarmerCrops(farmerCrops: FarmerCrop[]) {
        return this.http.post<BaseModel>(appConfig.apiUrl + 'users/saveFarmerCrops', farmerCrops);
    }
    
      saveUserRequest(userRequest: UserRequest) {
        return this.http.post(appConfig.apiUrl + 'users/saveUserRequest', userRequest);
    }
  
  
  getFarmerCrops(farmerId: number) {
        return this.http.get<FarmerCrop[]>(appConfig.apiUrl + 'users/getFarmerCrops/'+ farmerId);
    }
  getFarmerDetail(farmerId: number) {
        return this.http.get<FarmerDetail>(appConfig.apiUrl + 'users/getFarmerDetail/'+ farmerId);
    }
  
   getElibleFarmerForOrder(cropId: number) {
        return this.http.get<User[]>(appConfig.apiUrl + 'users/getElibleFarmerForOrder/'+ cropId);
    }
  
  
  
  
  
  
  
  
  
  
    
}