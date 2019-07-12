import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-employee-working-hour-list',
  templateUrl: './employee-working-hour-list.component.html',
  styleUrls: ['./employee-working-hour-list.component.scss']
})
export class EmployeeWorkingHourListComponent implements OnInit {
  empk$;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  
  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.empk$ = params.EmployeeKey);
  }
  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }
  ngOnInit() {
    debugger;
    this.empk$
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
  }

}
