import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-class/People';
import { ActivatedRoute, Router } from "@angular/router";
import { PeopleServiceService } from '../../../../service/people-service.service';
import { DatepickerOptions } from 'ng2-datepicker';
@Component({
  selector: 'app-edit-employeedetails',
  templateUrl: './edit-employeedetails.component.html',
  styleUrls: ['./edit-employeedetails.component.scss']
})
export class EditEmployeedetailsComponent implements OnInit {
  marked = true;
  // promoted= false;
  firstName: Array<any>;
  lastName: Array<any>;
  MiddleName: Array<any>;
  employeestatus: People[];
  jobtitle: People[];
  department: People[];
  supervisor: People[];
  editempdtails;
  empk$: Object;
  BirthDate: Date;
  HireDate: Date;
  delete_EmpKey: Number;
  employeedetailstable: People[];

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  empNum;
  statusFlag;
  remark;

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

  constructor(private route: ActivatedRoute, private PeopleServiceService: PeopleServiceService, private router: Router) {
    this.route.params.subscribe(params => this.empk$ = params.EmployeeKey);
  }

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

  editEmployee(EmployeeNumber, UserRoleTypeKey, FirstName, LastName, MiddleName, BD, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, HD, IsSupervisor, SupervisorKey, JobTitleKey, DepartmentKey) {
    var mankey;
    if (!(this.editempdtails.EmployeeNumber)|| !EmployeeNumber.trim()) {
      alert("Employee Number is not provided !");
      return;
    }
    if (!(this.editempdtails.UserRoleTypeKey)) {
      alert("User Role Type is not provided !");
      return;
    }

    if (!(FirstName) || !(FirstName.trim())) {
      alert("First Name is not provided !");
      return;
    }
    if (!(LastName) || !(LastName.trim())) {
      alert("Last Name is not provided !");
      return;
    }
    if (!(this.editempdtails.Gender)) {
      Gender = null;
    }
    if (!(this.editempdtails.EmployeeStatusKey)) {
      alert("Employee Status is not provided !");
      return;
    }
    if (!(PrimaryPhone) || !(PrimaryPhone.trim())) {
      alert("Primary Phone is not provided !");
      return;
    }

    if((EmployeeStatusKey!=1) && !(this.remark))
    {
      alert("Remarks are not provided !");
      return;
    }
    if (!(this.HireDate)) {
      alert("Hire Date is not provided !");
      return;
    }
    if (!(this.editempdtails.JobTitleKey)) {
      alert("Job Title is not provided !");
      return;
    }
    if (!(this.editempdtails.DepartmentKey)) {
      alert("Department is not provided !");
      return;
    }
    var birthdt;
    var currentDate = this.convert_DT(new Date());

    if (!(this.BirthDate)) {
      birthdt = this.convert_DT(new Date());
    }
    else {
      birthdt = this.convert_DT(this.BirthDate);
    }
    var hiredt = this.convert_DT(this.HireDate);
    if (birthdt > currentDate) {
      alert("Wrong Birth Date !");
      return;
    }
    if (hiredt > currentDate) {
      alert("Wrong Hire Date !");
      return;
    }
    if (hiredt < birthdt) {
      alert("Hire Date must be greater than birth date !");
      return;
    }
    if(this.editempdtails.UserRoleTypeKey==3 && !(this.editempdtails.ManagerKey) )
    {
      mankey = this.employeekey;
    }
    else{
      mankey = this.editempdtails.ManagerKey;
    }
    // var empNum ;
    if (this.empNum == this.editempdtails.EmployeeNumber) {
      this.PeopleServiceService.UpdateEmployeeDetailsbyManager(this.employeekey, this.empk$, this.OrganizationID, EmployeeNumber, UserRoleTypeKey, FirstName, LastName, MiddleName, birthdt, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, hiredt, IsSupervisor, SupervisorKey, JobTitleKey, DepartmentKey,this.remark)
        .subscribe((data: People[]) => {
          alert("Updated Successfully!");
          // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }]);
          if (this.role == 'Manager') {
            this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }]);
          }
          else if (this.role == 'Employee' && this.IsSupervisor == 1) {
            this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['ViewEmployee'] } }]);
          }
        });
    }
    else {
      this.PeopleServiceService.CheckForEmployeenumber(this.editempdtails.EmployeeNumber, this.employeekey, this.OrganizationID).subscribe((data: any[]) => {
        if (data[0].count == 0) {
          var hiredt = this.convert_DT(this.BirthDate);
          this.PeopleServiceService.UpdateEmployeeDetailsbyManager(mankey, this.empk$, this.OrganizationID, EmployeeNumber, UserRoleTypeKey, FirstName, LastName, MiddleName, birthdt, Gender, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, hiredt, IsSupervisor, SupervisorKey, JobTitleKey, DepartmentKey,this.remark)
            .subscribe((data: People[]) => {
              alert("Updated Successfully!");
              // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }]);
              if (this.role == 'Manager') {
                this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }]);
              }
              else if (this.role == 'Employee' && this.IsSupervisor == 1) {
                this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['ViewEmployee'] } }]);
              }
            });
        }
        else {
          alert("Employee Number already exist !");
        }
      });
    }
  }

  deleteEmployee() {
    this.PeopleServiceService
      .DeleteEmployeeDetailsbyManager(this.delete_EmpKey, this.OrganizationID, this.employeekey).subscribe(res => {
        // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }])
        if (this.role == 'Manager') {
          this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }]);
        }
        else if (this.role == 'Employee' && this.IsSupervisor == 1) {
          this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['ViewEmployee'] } }]);
        }
      });
  }
  deleteEmpPass(empk$) {
    this.delete_EmpKey = empk$;
  }
  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

      this.PeopleServiceService.EditEmployeeDetailsbyManager(this.empk$, this.OrganizationID).subscribe((data: Array<any>) => {
      this.editempdtails = data[0];
      this.BirthDate = this.editempdtails.BirthDate;
      this.HireDate = this.editempdtails.HireDate;
      this.empNum = this.editempdtails.EmployeeNumber;
      if(this.editempdtails.EmployeeStatusKey!=1 && this.editempdtails.EmployeeStatusKey!="")
      {
        this.statusFlag=true;
        this.remark=this.editempdtails.Remark;
      }

    });

    this.PeopleServiceService
      .getEmployeeStatusListforDropdown(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.employeestatus = data;
      });
    this.PeopleServiceService
      .getJobTitleListforDropdown(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.jobtitle = data;
      });
    this.PeopleServiceService
      .getDeptListforDropdown(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.department = data;
      });

    this.PeopleServiceService
      .getSupervisorListforDropdown(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.supervisor = data;
      });
  }

  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = false;
    } else {
      this.marked = true;
    }
  }
  GoBack() {
    // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }]);
    if (this.role == 'Manager') {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewEmployee'] } }]);
    }
    else if (this.role == 'Employee' && this.IsSupervisor == 1) {
      this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['ViewEmployee'] } }]);
    }
  }

  statusChanged(statusKey)
  {
    if(statusKey!=1 && statusKey!="")
    {
      this.statusFlag=true;
    }
    else
    {
      this.statusFlag=false;
    }

  }
}
