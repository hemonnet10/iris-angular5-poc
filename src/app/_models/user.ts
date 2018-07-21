import { Role,FarmerDetail, FarmerCrop } from '../_models/index';
export class User {
    id: number;
    name: string;
	email:string;
    gender:string;
    password: string;
    mobile: string;
    role: Role;
    authId: string;
	confirm_password: string;
	DOB:string;
	address:string;
	country:string;
	state:string;
	district:string;
	city_viilage:string;
	pin:number;
	mandi:string;
	farm:string;
	unit:string;
	
	
}

 