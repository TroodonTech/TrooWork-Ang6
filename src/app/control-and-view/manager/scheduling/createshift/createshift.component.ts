import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../service/scheduling.service';
@Component({
  selector: 'app-createshift',
  templateUrl: './createshift.component.html',
  styleUrls: ['./createshift.component.scss']
})
export class CreateshiftComponent implements OnInit {
  
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

  Description;
  Abbrevation;
  publishas;
  time1;
  paidhours;
  time2;
  color;

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

  createShift(){
      var q = this.time1.getHours();
      var q1 = this.time1.getMinutes();
      var newTime1 = q + ":" + q1;

      var t = this.time2.getHours();
      var t1 = this.time2.getMinutes();
      var newTime2 = t + ":" + t1;

    this.scheduleServ.createEmpShiftwithColourCode(this.Description,this.Abbrevation,this.publishas,newTime1,this.paidhours,newTime2,this.color,this.OrganizationID,this.employeekey).subscribe((data: any[]) => {
      
    });
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
  }

}
