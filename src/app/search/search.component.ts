import { FarmerCrop } from '../_models/farmer.crop';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { User, Order, Category, Crop, SearchInput, Country, State, District } from '../_models/index';
import { SearchResult } from '../_models/search.result';
import { AlertService, UserService, OrderService, MasterDataService } from '../_services/index';
import { FormBuilder, Form } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-4-dropdown-multiselect';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from "ng-auto-complete";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInput: SearchInput;
  searchResults: SearchResult[];
  selectedCropId: number;
  selectedVolume: number;

  loading = false;
  optionsModel: IMultiSelectOption;
  myOptions: IMultiSelectOption[];
  countries: Country[]=[];
  states: State[]=[];
  districts: District[]=[];



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
    private masterDataService: MasterDataService,
    private formBuilder: FormBuilder) {
    this.searchInput = userService.searchInput;
    if (this.searchInput == null) {
      this.searchInput = new SearchInput();
    }

    if (this.route.snapshot.queryParams['type'] != null) {
      this.searchInput.searchType = this.route.snapshot.queryParams['type'];
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.searchInput = this.searchInput;

  }



  selected(item: SelectedAutocompleteItem) {
    console.log(item.item.original);
    this.searchInput.cropName = item.item.title;

  }
  onChange(event) {
    console.log(event);
    console.log(this.optionsModel.id);
    console.log(this.optionsModel.id);
    console.log(this.optionsModel.name);
  }


  ngOnInit() {
    this.order.crop = new Crop();
    this.searchResults = this.userService.searchResults;
    this.searchInput = this.userService.searchInput;
    this.selectedCropId = this.userService.selectedCropId;
    this.getCropByCategory(3);
    this.getAllCountries();

  }
  search() {
    this.userService.searchInput = this.searchInput;
    this.userService.search().subscribe(
      response => {
        this.userService.searchResults = response;
        this.searchResults = response;

      });

  }
  public createOrder() {
    this.userService.selectedCropId = this.selectedCropId;
    if (this.currentUser == null || this.currentUser.role == null) {
      this.router.navigate(['login'], { queryParams: { returnUrl: 'search' } });
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
    this.orderService.getAllCategories().subscribe(categories => { this.categories = categories; });
  }

  private getCropByCategory(categoryId: number) {
    this.orderService.getCropByCategory(categoryId).subscribe(crops => {
      this.crops = crops;
      for (let crop1 of this.crops) {
        this.groupCrops.push({ id: crop1.id, name: crop1.cropName });
      }
      this.myOptions = this.groupCrops;
    });


  }
  private getAllCountries() {
    this.masterDataService.getAllCountries().subscribe(countries => { this.countries = countries; });
  }
  filterForState(filterVal: any) {
    if (filterVal == "0")
      console.log(0);
    else
      this.masterDataService.getAllStates(filterVal).subscribe(states => { this.states = states; });
  }
  filterForDistrict(filterVal: any) {
    if (filterVal == "0")
      console.log(0);
    else
      this.masterDataService.getAllDistricts(filterVal).subscribe(districts => { this.districts = districts; });
  }


}
