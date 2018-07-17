import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/index';

import {HomeComponent} from './home/index';

import {RegisterComponent, FarmerDetailComponent} from './register/index';
import {AuthGuard, FarmerGuard, PartnerGuard, EmployeeGuard} from './_guards/index';
import {FarmerDashboardComponent} from './farmer-dashboard/index';
import {OrderComponent, CreateOrderComponent, FarmerOrderHistoryComponent, AssignOrderComponent} from './order/index';
import {FacilityComponent, SchemeComponent, HelpComponent} from './facility/index';
import {GroupComponent} from './group/index';
import {PreserveFoodComponent} from './preserve-food/preserve-food.component';
import {NgModule} from '@angular/core';
import {SearchComponent} from './search/index';

const appRoutes: Routes = [
  {path: 'preserve', component: PreserveFoodComponent},

  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent},

  {path: 'my_dashboard', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'farmer', component: FarmerDashboardComponent, canActivate: [FarmerGuard]},
  {path: 'earn', component: OrderComponent, canActivate: [FarmerGuard]},
  {path: 'facility', component: FacilityComponent, canActivate: [FarmerGuard]},
  {path: 'group', component: GroupComponent, canActivate: [FarmerGuard]},
  {path: 'scheme', component: SchemeComponent, canActivate: [FarmerGuard]},
  {path: 'order_search', component: CreateOrderComponent, canActivate: [PartnerGuard]},
  {path: 'farmer_detail', component: FarmerDetailComponent, canActivate: [FarmerGuard]},
  {path: 'farmer_history', component: FarmerOrderHistoryComponent, canActivate: [FarmerGuard]},
  {path: 'help', component: HelpComponent, canActivate: [FarmerGuard]},
  {path: 'assign_order', component: AssignOrderComponent, canActivate: [EmployeeGuard]},



  // otherwise redirect to login
  {path: '**', redirectTo: 'HomeComponent', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


























