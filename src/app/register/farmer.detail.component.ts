import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, UserService, OrderService} from '../_services/index';
import {User, Role, FarmerDetail, Category, Crop, FarmerCrop} from '../_models/index';
import {FormGroup, FormArray} from "@angular/forms";
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from 'ng-auto-complete';


@Component({
  moduleId: module.id,
  templateUrl: 'farmer.detail.component.html',
  styleUrls: ['./farmer.detail.component.css']
})

export class FarmerDetailComponent {
  //  groupCrops: any=[];
  optionsModel: number[];
  user: User;
  farmerDetail: FarmerDetail;
  loading = false;
  categories: Category[];
  crops: Crop[];
  farmerCrops: FarmerCrop[] = [];
  selectedCrops: Crop[] = [];
  cropIds: string[] = [];

  public form: FormGroup;

  @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
  groupCrops: any = [];
  public group: any;




  Selected(item: SelectedAutocompleteItem) {
    const crop: Crop = new Crop();
    crop.cropName = item.item.title;
    crop.id = +item.item.id;

    if (this.selectedCrops.indexOf(crop) < 0) {
      this.selectedCrops.push(crop);
    }

  }

  removeSelected(index: number) {
    this.selectedCrops.splice(index, 1);

  }

  constructor(
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private alertService: AlertService) {

    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (!this.farmerDetail) {
      this.farmerDetail = new FarmerDetail();
    }
    this.getCropByCategory(3);
    this.getFarmerCrops(this.user.id);
    this.getFarmerDetail(this.user.id);




  }
  ngOnInit() {


  }



  updateProfile() {
    this.farmerCrops = [];
    const farmer: User = new User();
    farmer.id = this.user.id;
    this.farmerDetail.farmerId = farmer.id;
    for (const crop of this.selectedCrops) {
      //      let crop2: Crop = crop;
      const farmerCrop: FarmerCrop = new FarmerCrop();
      farmerCrop.crop = crop;
      farmerCrop.farmerId = farmer.id;
      if (this.farmerCrops.indexOf(farmerCrop) == -1) {
        this.farmerCrops.push(farmerCrop);
      }
    }


    this.userService.saveFarmerCrops(this.farmerCrops)
      .subscribe(
      data => {
        this.alertService.success('Crops Updated successfully', true);
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });



    this.loading = true;
    this.userService.saveFarmerDetail(this.farmerDetail)
      .subscribe(
      data => {
        this.alertService.success('Profile Updated successfully', true);
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });



  }

  private getCropByCategory(categoryId: number) {
    this.orderService.getCropByCategory(categoryId).subscribe(crops => {
      this.crops = crops;
      for (const crop1 of this.crops) {
        this.groupCrops.push({id: crop1.id, title: crop1.cropName, original: crop1});
      }

      this.group = [
        CreateNewAutocompleteGroup(
          'Search / choose in / from list',
          'completer',
          this.groupCrops,
          {titleKey: 'title', childrenKey: null}
        ),
      ];
    });
  }
  private getFarmerDetail(farmerId: number) {
    this.userService.getFarmerDetail(farmerId).subscribe(farmerDetail => {
      this.farmerDetail = farmerDetail;
    });
  }

  private getFarmerCrops(farmerId: number) {
    this.userService.getFarmerCrops(farmerId).subscribe(farmerCrops => {
      this.farmerCrops = farmerCrops;
      for (const farmerCrop of this.farmerCrops) {
        const crop: Crop = new Crop();
        crop.cropName = farmerCrop.crop.cropName;
        crop.id = farmerCrop.crop.id;
        this.selectedCrops.push(crop);
      }

    });
  }


}
