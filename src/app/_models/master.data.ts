
 export class Country {
    id: number;
    countryName: string;
}

export class State {
    id: number;
    cId: number;
    stateName: string;
}

export class District {
    id: number;
    sId: number;
    districtName: string;
}

export class Category {
    id: number;
    name: string;
    isActive: string;
    pid: number;
}
