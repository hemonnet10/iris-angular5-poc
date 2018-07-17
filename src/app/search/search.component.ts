import {FarmerCrop} from '../_models/farmer.crop';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';

import {User, Order, Category, Crop} from '../_models/index';
import {AlertService, UserService, OrderService} from '../_services/index';
import {FormBuilder, Form} from '@angular/forms';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-4-dropdown-multiselect';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
//import { takeUntil } from 'rxjs/Operator';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  type: string = 'Crop';
  cropName: string;
  farmerCrops: FarmerCrop[];
  selectedCropId: number;

  loading = false;
  optionsModel: number;
  myOptions: IMultiSelectOption[];

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
  @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
  groupCrops: any = [];
  public group: any;
  myForm: Form;
  currentUser: User;
  order: Order = new Order();
  cropId: number;
  categories: Category[];
  crops: Crop[];
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {

    if (this.route.snapshot.queryParams['type'] != null)
      this.type = this.route.snapshot.queryParams['type'];
    else
      this.type = this.userService.type;
    //this.name = this.route.snapshot.queryParams['name'];
    console.log('sssssssss=' + this.type);

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.type = this.type;

  }



  selected(item: SelectedAutocompleteItem) {
    console.log(item.item.original);
    this.cropName = item.item.title;

  }
  onChange(event) {
    console.log(this.optionsModel);
  }


  ngOnInit() {
    this.getCropByCategory(3);
    this.order.crop = new Crop();
    this.farmerCrops = this.userService.farmerCrops;
    this.cropName = this.userService.cropName
    this.type = this.userService.type;
    this.selectedCropId = this.userService.selectedCropId;

  }
  search() {
    this.userService.cropName = this.cropName;
    this.userService.search().subscribe(
      response => {
        this.userService.farmerCrops = response;
        this.farmerCrops = response;

      });

  }
  public createOrder() {
    this.userService.selectedCropId = this.selectedCropId;
    if (this.currentUser == null || this.currentUser.role == null) {
      this.router.navigate(['login'], {queryParams: {returnUrl: 'search'}});
      return;
    }
    this.order.crop.id = +this.selectedCropId;
    this.order.orderPlacedBy = this.currentUser.id;
    this.orderService.createOrder(this.order).subscribe(
      response => {
        let newOrder: Order = new Order();
        newOrder.crop = new Crop();
        this.order = newOrder;
        this.alertService.success(response.message);
      });

  }

  private getAllCategories() {
    this.orderService.getAllCategories().subscribe(categories => {this.categories = categories;});
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

  filterForCatergory(filterVal: any) {
    if (filterVal == "0")
      console.log(0);
    else
      this.getCropByCategory(filterVal);
  }

  filterForCrop(filterVal: any) {

  }


}
