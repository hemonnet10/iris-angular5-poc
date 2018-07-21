import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Order, Category, Crop, FarmerCrop } from '../_models/index';
import {AlertService,UserService, OrderService } from '../_services/index';
import { StatusFilterPipe} from '../filter/index';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-4-dropdown-multiselect';

@Component({
    moduleId: module.id,
    templateUrl: 'myfarm.component.html'
})

export class MyfarmComponent implements OnInit {
  loading = false;
    currentUser: User;
    farmerCrop:FarmerCrop=new FarmerCrop();
    farmerCrops: FarmerCrop[] = [];
	order:Order;
	 statusFilter: StatusFilterPipe = new StatusFilterPipe();
     groupCrops: any = [];
     optionsModel: IMultiSelectOption;
     myOptions: IMultiSelectOption[]=[];
     cropId: number;
     categories: Category[];
     crops: Crop[];
   
  // Settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    selectionLimit: 1,
    autoUnselect: true
  };
  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Crop Name',//Farm or Crop name/State/District/Area Pin Code
    allSelected: 'All selected'

  };
   



     constructor(
    private userService: UserService,
    private orderService: OrderService,
       private router: Router,
    private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.getCropByCategory(17);


    }

    ngOnInit() {
        this.farmerCrop.crop= new Crop();
        this.getFarmerCrops(this.currentUser.id);
    }

    onChange(event) {
        console.log(this.optionsModel);
        if(+this.optionsModel>0)
        this.farmerCrop.crop.id=+this.optionsModel;
    }
    private acceptOrder(orderId:number){
    this.order= new Order();
    this.order.id=orderId;
    this.order.status='Accepted';
        this.orderService.updateOrder(this.order).subscribe(
        response => { 
        //this.alertService.success(response.message);
         // this.getFarmerCrops(this.currentUser.id);
         });
    
    }


    private saveFarm(){
        this.farmerCrop.farmerId=this.currentUser.id;
        let farmerCrops=[];
        farmerCrops.push(this.farmerCrop); 
            this.userService.saveFarmerCrops(farmerCrops).subscribe(
            response => { 
            this.alertService.success("Crop saved successfully.");
            this.farmerCrop=new FarmerCrop();
            this.farmerCrop.crop= new Crop();
            jQuery('#farmModel').modal('hide');
            this.getFarmerCrops(this.currentUser.id);
             });
        
        }

    private getFarmerCrops(userId:number) {
        this.userService.getFarmerCrops(userId).subscribe(farmerCrops => { this.farmerCrops = farmerCrops; });
    }
    private getCropByCategory(categoryId: number) {
        this.orderService.getCropByCategory(categoryId).subscribe(crops => {
          this.crops = crops;
          for (let crop1 of this.crops) {
            this.groupCrops.push({id: crop1.id, name: crop1.cropName});
          }
          this.myOptions = this.groupCrops;
        });
    
    
}