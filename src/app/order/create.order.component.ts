import {Component, OnInit, ViewChild} from '@angular/core';

import {User, Order, Category, Crop} from '../_models/index';
import {AlertService, UserService, OrderService} from '../_services/index';
import { FormBuilder, Form } from '@angular/forms';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-4-dropdown-multiselect';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
//import { takeUntil } from 'rxjs/Operator';

@Component({
  moduleId: module.id,
  templateUrl: 'create.order.component.html'
})

export class CreateOrderComponent implements OnInit {
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
    defaultTitle: 'Search Crop',
    allSelected: 'All selected'

};
  @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
  groupCrops: any = [];
  public group: any;
  myForm:Form;
  currentUser: User;
  order: Order = new Order();
  cropId: number;
  categories: Category[];
  crops: Crop[];
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private alertService: AlertService,
  private formBuilder:FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  selected(item: SelectedAutocompleteItem) {
    console.log(item.item.original);
    this.order.crop.id = +item.item.id;

  }
  onChange(event) {
    console.log(this.optionsModel);
  }




  ngOnInit() {
    //this.getAllCategories();
    this.getCropByCategory(3);
    this.order.crop = new Crop();
 /* this.myForm = this.formBuilder.group({
            optionsModel: [1, 2], // Default model
        });
 
       this.myForm.controls['optionsModel'].valueChanges
            .subscribe((selectedOptions) => {
                // changes
              console.log("selectedOptions");
               console.log(selectedOptions);
              // this.order.crop.id = +this.optionsModel.;
            });
       * */  
   
  }


  public createOrder() {
    this.order.crop.id = +this.optionsModel;
      console.log(this.optionsModel);
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