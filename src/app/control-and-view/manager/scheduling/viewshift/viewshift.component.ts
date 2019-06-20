import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../service/scheduling.service';
@Component({
  selector: 'app-viewshift',
  templateUrl: './viewshift.component.html',
  styleUrls: ['./viewshift.component.scss']
})
export class ViewshiftComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  shiftdetails;
  delete_shiftKey;

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

  constructor(private scheduleServ: SchedulingService) { }

  ngOnInit() {
    //token starts....
    
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    //token ends

    this.scheduleServ.getShifts(this.employeekey,this.OrganizationID).subscribe((data: any[]) => {
      this.shiftdetails =data;
    });
  }
  deleteShiftPass(Idemployeeshift) {
    this.delete_shiftKey = Idemployeeshift;
  }
  deleteShift(){
    this.scheduleServ.removeEmployeeShift(this.delete_shiftKey,this.employeekey,this.OrganizationID).subscribe((data: any[]) => {
      alert("Shift deleted successfully");
      this.scheduleServ.getShifts(this.employeekey,this.OrganizationID).subscribe((data: any[]) => {
        this.shiftdetails =data;
      });
    });
  }
}
