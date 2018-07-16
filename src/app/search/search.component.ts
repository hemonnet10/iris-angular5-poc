import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


 type:string;
 name:string;
 


  constructor(private route: ActivatedRoute) { 
        this.type = this.route.snapshot.queryParams['type'];
        this.name = this.route.snapshot.queryParams['name'];
    console.log('sssssssss='+this.type);
	///call a service to get search results
	///for now create dummy data and show in html
	
  }

  ngOnInit() {
  }

}
