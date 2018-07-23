import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AlertComponent} from './_directives/index';
import {AuthGuard, FarmerGuard, PartnerGuard, EmployeeGuard} from './_guards/index';
import {JwtInterceptorProvider, ErrorInterceptorProvider} from './_helpers/index';
import {AlertService, AuthenticationService, UserService, OrderService, FacilityService, GroupService, MasterDataService} from './_services/index';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent, FarmerDetailComponent} from './register/index';
import {FarmerDashboardComponent} from './farmer-dashboard/index';
import {OrderComponent, CreateOrderComponent, MyfarmComponent, AssignOrderComponent} from './order/index';
import {FacilityComponent, SchemeComponent, HelpComponent} from './facility/index';
import {GroupComponent} from './group/index';
import {StatusFilterPipe} from './filter/index';
import {NgAutoCompleteModule} from "ng-auto-complete";
import {PreserveFoodComponent} from './preserve-food/preserve-food.component';
import {AppRoutingModule} from './app-routing.module';
import {MultiselectDropdownModule} from 'angular-4-dropdown-multiselect';
import {SearchComponent} from './search/index';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgAutoCompleteModule,
    MultiselectDropdownModule,
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FarmerDashboardComponent,
    OrderComponent,
    CreateOrderComponent,
    FacilityComponent,
    GroupComponent,
    StatusFilterPipe,
    FarmerDetailComponent,
    SchemeComponent,
    MyfarmComponent,
    HelpComponent,
    AssignOrderComponent,
    PreserveFoodComponent,
    SearchComponent],

  providers: [
    AuthGuard,
    AlertService,
    FarmerGuard,
    PartnerGuard,
    EmployeeGuard,
    AuthenticationService,
    UserService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider,
    OrderService,
    MasterDataService,
    FacilityService,
    GroupService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}