import {Component, ChangeDetectorRef} from '@angular/core';


import {AuthenticationService} from './_services/index';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private cdRef: ChangeDetectorRef
  ) {}

  getRole() {
    return this.authenticationService.getRole();
  }
  ngAfterViewChecked() {
    console.log("view changed");
    this.cdRef.detectChanges();
  }

}