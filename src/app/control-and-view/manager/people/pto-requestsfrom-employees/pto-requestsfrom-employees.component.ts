import { Component, OnInit } from '@angular/core';
import { PeopleServiceService } from "../../../../service/people-service.service";

@Component({
  selector: 'app-pto-requestsfrom-employees',
  templateUrl: './pto-requestsfrom-employees.component.html',
  styleUrls: ['./pto-requestsfrom-employees.component.scss']
})
export class PtoRequestsfromEmployeesComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  curr_date;
  startdate;
  enddate;
  assignment;
  comments;
  requestdetails;
  deleterequestKey;

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

  constructor(private PeopleServiceService: PeopleServiceService) { }

  ngOnInit() {
    
  var token = localStorage.getItem('token');
  var encodedProfile = token.split('.')[1];
  var profile = JSON.parse(this.url_base64_decode(encodedProfile));
  this.role = profile.role;
  this.IsSupervisor = profile.IsSupervisor;
  this.name = profile.username;
  this.employeekey = profile.employeekey;
  this.OrganizationID = profile.OrganizationID;
 
  this.PeopleServiceService.getRequestdetailsforManager(this.employeekey,this.OrganizationID)
    .subscribe((data) => {
    this.requestdetails = data;
    });
  }

}
