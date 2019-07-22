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

  fromdate;
  todate;
  ptoStatus;

  vpto;

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

    this.fromdate = new Date(Date.now());
    this.todate = new Date(Date.now());
    this.ptoStatus = '';

    this.fromdate = this.convert_DT(this.fromdate);
    this.todate = this.convert_DT(this.todate);

    var pstatus = null;

    this.vpto = {
      fromdate: this.fromdate,
      todate: this.todate,
      ptoStatus: pstatus,

      OrganizationID: this.OrganizationID,
      employeekey: this.employeekey
    };
    // this.PeopleServiceService.getRequestdetailsforManager(this.employeekey, this.OrganizationID)
    //   .subscribe((data) => {
    //     this.requestdetails = data;
    //   });

    this.PeopleServiceService.getPTORequestdetailsforManager(this.vpto)
      .subscribe((data) => {
        this.requestdetails = data;
      });

  }
  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  viewpto(fromdate, todate, ptoStatus) {

    if ((todate) && (this.convert_DT(fromdate) > this.convert_DT(todate))) {
      todate = null;
      alert("Please check your Start Date!");
      return;
    }
    else {
      var fdate;
      var tdate;
      fdate = this.convert_DT(fromdate);
      tdate = this.convert_DT(todate);

      var pstatus;
      if (!ptoStatus) {
        pstatus = null;
      }
      else {
        pstatus = ptoStatus;
      }

      this.vpto = {
        fromdate: fdate,
        todate: tdate,
        ptoStatus: pstatus,

        OrganizationID: this.OrganizationID,
        employeekey: this.employeekey
      };

      this.PeopleServiceService.getPTORequestdetailsforManager(this.vpto)
        .subscribe((data) => {
          this.requestdetails = data;
        });
    }
  }

}
