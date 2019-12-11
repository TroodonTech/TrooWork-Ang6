import { Component, OnInit, HostListener, Input, ElementRef } from '@angular/core';
import { SchedulingService } from '../../../../service/scheduling.service';

@Component({
  selector: 'app-scheduler-cronjob-manual',
  templateUrl: './scheduler-cronjob-manual.component.html',
  styleUrls: ['./scheduler-cronjob-manual.component.scss']
})
export class SchedulerCronjobManualComponent implements OnInit {

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  loading: boolean;

  curDate;
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

  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");

  }
  constructor(private scheduleService: SchedulingService) { }

  createCJ() {
    this.loading = true;
    this.scheduleService.createSchedulerCronjob(this.OrganizationID, this.curDate, this.employeekey)
      .subscribe(res => {
        this.loading = false;
        alert("Cronjobs created successfully");
      });
  }

  deleteCJ() {
    this.loading = true;
    this.scheduleService.deleteSchedulerCronjob(this.OrganizationID,  this.employeekey)
      .subscribe(res => {
        this.loading = false;
        alert("Cronjobs deleted successfully");
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
    this.curDate = this.convert_DT(new Date());
  }

}
