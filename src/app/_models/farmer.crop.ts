
import {Crop, User} from './index';

export class FarmerCrop {
  id: number;
  crop: Crop;
  farmerId: number;
  volume: number;
  price: number;
  unit: string='Quintal';
  seedGrowingMonth: string;
  cropShowingMonth: string;
  season: string;
  year: string;
  fieldSize: number;
  fieldUnit: string;
}
