import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Country, State, District } from '../_models';

@Injectable()
export class MasterDataService {
    constructor(private http: HttpClient) { }

    getAllCountries() {
        return this.http.get<Country[]>(appConfig.apiUrl + 'master/getAllCountry/');
    }

    getAllStates(categoryId: number) {
        return this.http.get<State[]>(appConfig.apiUrl + 'master/getAllState/' + categoryId);
    }
    getAllDistricts(categoryId: number) {
        return this.http.get<District[]>(appConfig.apiUrl + 'master/getAllDistrict/' + categoryId);
    }


}