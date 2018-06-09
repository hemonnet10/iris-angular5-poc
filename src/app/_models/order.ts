import { Crop, User,OrderAssign } from '../_models/index';
export class Order {
    id: number;
    orderDate: Date= new Date();
    orderPlacedBy: number;
    orderReceivedBy: number;
    crop: Crop;
    orderDueDate: string;
    quantity: string;
	 status: string;
  description:string;
	orderAssigns:OrderAssign[];   
  eligibleFarmers:User[];
}