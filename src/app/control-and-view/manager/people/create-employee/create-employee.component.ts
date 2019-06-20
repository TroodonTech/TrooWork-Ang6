import { Component, OnInit, Input } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { ActivatedRoute, Router } from "@angular/router";
import { DatepickerOptions } from 'ng2-datepicker';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  marked = true;
  useroletype: People[];
  jobtitle: People[];
  supervisor: People[];
  department: People[];
  EmployeeNumber;
  UserRoleTypeKey;
  FirstName: String;
  LastName: String;
  MiddleName: String;
  BirthDate;
  Gender: String;
  AddressLine1: any;
  City: String;
  AddressLine2: any;
  State: String;
  Country: String;
  PrimaryPhone: any;
  ZipCode: any;
  AlternatePhone: any;
  EmailID: any;
  HireDate;
  theCheckbox: any;
  JobTitleKey;
  SupervisorKey;
  DepartmentKey;
  temp_res;

  minDate;
  maxDate;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID;

  // adding properties and methods that will be used by the igxDatePicker
  public date: Date = new Date(Date.now());

  // private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  // private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  // public formatter = (_: Date) => {
  //   return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  // }
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    //locale: frLocale,
    //minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };



  constructor(private route: ActivatedRoute, private PeopleServiceService: PeopleServiceService, private router: Router) { }

  numberValid(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  charValidation(event: any) {
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
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

  createEmployee() {
    var managerkey;
    // managerkey = this.employeekey;
    if (!(this.EmployeeNumber) || !this.EmployeeNumber.trim()) {
      alert("Employee Number Not provided !");
      return;
    }
    if (!(this.UserRoleTypeKey)) {
      alert("User Role Type Not provided !");
      return;
    }
    if (this.UserRoleTypeKey == 3) {
      managerkey = this.employeekey;
    }
    else {
      managerkey = -1;
    }
    if (!(this.FirstName) || !this.FirstName.trim()) {
      alert("First Name is not provided !");
      return;
    }
    if (!(this.LastName) || !this.LastName.trim()) {
      alert("Last Name is not provided !");
      return;
    }
    if (!(this.Gender)) {
      this.Gender = null;
    }
    if (!(this.PrimaryPhone) || !this.PrimaryPhone.trim()) {
      alert("Primary Phone is not provided !");
      return;
    }
    if (!(this.HireDate)) {
      alert("Hire Date is not provided !");
      return;
    }
    if (!(this.JobTitleKey)) {
      alert("Job Title is not provided !");
      return;
    }
    if (!(this.DepartmentKey)) {
      alert("Department is not provided !");
      return;
    }
    var BD;
    var currentDate = this.convert_DT(new Date());

    if (!(this.BirthDate)) {
      // BD = this.convert_DT(new Date());
      // BD = null;
      BD = '1990-01-01';
    }
    else {
      BD = this.convert_DT(this.BirthDate);
    }
    var HD = this.convert_DT(this.HireDate);
    if (BD > currentDate) {
      alert("Wrong Birth Date !");
      return;
    }
    if (HD > currentDate) {
      alert("Wrong Hire Date !");
      return;
    }
    if (HD < BD) {
      alert("Hire Date must be greater than birth date !");
      return;
    }
    var str = "";
    str = this.FirstName + '' + this.LastName;
    this.PeopleServiceService.checkEmpNumber(this.EmployeeNumber, this.employeekey, this.OrganizationID).subscribe((data: any[]) => {
      if (data[0].count == 0) {
        this.PeopleServiceService.createEmployeebyManager(this.EmployeeNumber, this.FirstName, this.LastName, this.MiddleName, BD, this.Gender, this.AddressLine1, this.City, this.AddressLine2, this.State, this.Country, this.PrimaryPhone, this.ZipCode, this.AlternatePhone, this.EmailID, HD, this.theCheckbox, this.JobTitleKey, this.SupervisorKey, this.DepartmentKey, this.employeekey, this.OrganizationID, managerkey).subscribe((data22: any[]) => {
          this.temp_res = data22;
          alert("Employee Created !");
          var empKey = this.temp_res.EmployeeKey;
          // this.router.navigate(['/Settingusernameandpswrdaftremplcreatebyman', empKey, str, this.UserRoleTypeKey]);
          // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['Settingusernameandpswrdaftremplcreatebyman', empKey, str, this.UserRoleTypeKey] } }]);
          if (this.role == 'Manager') {
            this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['Settingusernameandpswrdaftremplcreatebyman', empKey, str, this.UserRoleTypeKey] } }]);
          }
          else if (this.role == 'Employee' && this.IsSupervisor == 1) {
            this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['Settingusernameandpswrdaftremplcreatebyman', empKey, str, this.UserRoleTypeKey] } }]);
          }
        });
      } else {
        alert('Employee number already present!');
        return;
      }
    });
  }
  ngOnInit() {
    this.UserRoleTypeKey = '';
    this.Gender = '';
    this.JobTitleKey = '';
    this.SupervisorKey = '';
    this.DepartmentKey = '';

    this.UserRoleTypeKey = '';
    this.Gender = '';
    this.JobTitleKey = '';
    this.DepartmentKey = '';
    this.UserRoleTypeKey = '';

    this.minDate = new Date();
    this.maxDate = new Date();
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;

    this.PeopleServiceService
      .getUserRoleType(this.OrganizationID)
      .subscribe((data: People[]) => {
        this.useroletype = data;
      });
    this.PeopleServiceService
      .getJobTitleforadmindd(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.jobtitle = data;
      });
    this.PeopleServiceService
      .getSuperVisor(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.supervisor = data;
      });
    this.PeopleServiceService
      .getDepartment(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.department = data;
      });
  }

  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = false;
    } else {
      this.marked = true;
    }
  }
}
