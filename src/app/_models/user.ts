import { Role,FarmerDetail, FarmerCrop } from '../_models/index';
export class User {
    id: number;
    name: string;
    gender:string;
    password: string;
    mobile: string;
    role: Role;
    authId: string;
}

 