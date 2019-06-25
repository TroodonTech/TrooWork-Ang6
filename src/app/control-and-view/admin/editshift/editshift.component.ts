import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../service/scheduling.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-editshift',
  templateUrl: './editshift.component.html',
  styleUrls: ['./editshift.component.scss']
})
export class EditshiftComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  edit;
  shiftk$;
  StartTime;
  EndTime;
  Description;
  Abbrevation;
  PublishAs;
  PaidHours;
  Colour;

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

  constructor(private scheduleServ: SchedulingService,private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.shiftk$ = params.Idemployeeshift);
  }

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

    this.scheduleServ.getShiftsforEditing(this.shiftk$,this.OrganizationID).subscribe((data: any[]) => {
      this.edit =  data[0];
     
      var cur_time = new Date(Date.now());
      var timeValue1 = this.edit.StartTime;
      var timeValue2 = this.edit.EndTime;
      var test1 = timeValue1.split(":");
      var test2 = timeValue2.split(":");
      var start = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test1[0], test1[1], 0);
      var end = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test2[0], test2[1], 0);
      this.StartTime = start;
      this.EndTime = end;
    });
  }
  editShift(){
  // var q = this.StartTime.getHours();
  // var q1 = this.StartTime.getMinutes();
  // var newTime = q + ":" + q1;

  // var q2 = this.EndTime.getHours();
  // var q3 = this.EndTime.getMinutes();
  // var newTime1 = q2 + ":" + q3;

  // this.scheduleServ.updateShiftDetails(this.shiftk$,this.edit.Description,this.edit.Abbrevation,this.edit.PublishAs,newTime,this.edit.PaidHours,newTime1,this.edit.Colour,this.OrganizationID,this.employeekey).subscribe((data: any[]) => {
  //   alert("Updated Successfully")
  //  });
  }
}
