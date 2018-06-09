import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { User } from '../_models/index';
import { appConfig } from '../app.config';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {
roleId:number;

    constructor(private http: HttpClient) { }

    login(mobile: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + 'users/getUserByMobileAndPassword/', { mobile: mobile, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user ) {//&& user.authId
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.roleId=null;
    }
    
    getRole(){
    if(!this.roleId){
     let user:User=JSON.parse(localStorage.getItem('currentUser'));
    if(user && user.role)
    this.roleId=user.role.id;
    }
    return this.roleId;
    }
}