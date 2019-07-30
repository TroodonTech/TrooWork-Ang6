import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from "@angular/core";
import { DayPilot, DayPilotSchedulerComponent, DayPilotModalComponent } from "daypilot-pro-angular";
import { } from "daypilot-pro-angular";
import { DataService } from "./data.service";
import { CreateComponent } from "./create.component";
import { EditComponent } from "./edit.component";
import { SchedulingService } from '../../../../service/scheduling.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { DatepickerOptions } from 'ng2-datepicker';
@Component({
  selector: 'scheduler-component',
  template: `
  <div style="padding-left: 9rem;padding-right: 9rem;margin-top: 3%;margin-bottom: 3%;">
    <div class="row col-md-12 ">
      <h4 style="margin-left: 42%;margin-bottom:4%">EMPLOYEE SCHEDULER</h4>
    </div>
  
    <div style="margin-left: 1.5rem;margin-right: 1.5rem;padding-bottom: 1rem;padding-top: 1rem" class="row bg-info col-md-12">
      <div class="col-md-6">
        <h3 style="text-align: right"></h3>
        <div class="form-group" style="width: 85%;">
          <label>Date*</label>
           <ng-datepicker [options]="options" position="top-right" [(ngModel)]="date" (ngModelChange)="selecteddate();empCalendarActivities();"></ng-datepicker>
        </div>
      </div>
      <div class="col-md-6">
        <h3 style="text-align: right"></h3>
        <div class="form-group" style="width: 85%;">
          <label>View Range*</label>
           <select [(ngModel)]="Range" (change)='ViewType();empCalendarActivities();' class="form-control col-sm-9 col-md-9 col-lg-9" [value]="value" style="background-color: #d4f4ff;">
              <option value="">--Select--</option>
              <!-- <option value="Daily">Daily</option>-->
              <option value="Week">Week</option>
              <option value="Month">Month</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  
  
  <daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>
  <create-dialog #create (close)="createClosed($event)"></create-dialog>
  <edit-dialog #edit (close)="editClosed($event)"></edit-dialog>
`,
  styles: [`
   p, body, td { font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 10pt; }
            body { padding: 0px; margin: 0px; background-color: #ffffff; }
            a { color: #1155a3; }
            .space { margin: 10px 0px 10px 0px; }		
            .header { background: #003267; background: linear-gradient(to right, #011329 0%,#00639e 44%,#011329 100%); padding:20px 10px; color: white; box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.75); }
            .header a { color: white; }
            .header h1 a { text-decoration: none; }
            .header h1 { padding: 0px; margin: 0px; }
            .main { padding: 10px; margin-top: 10px; }
            
  `]
})
export class SchedulerComponent implements AfterViewInit {
  constructor(private ds: DataService, private cdr: ChangeDetectorRef, private SchedulingService: SchedulingService) {
    this.Range = 'Month';
  }
  @ViewChild("modal") modal: DayPilotModalComponent;
  @ViewChild("scheduler") scheduler: DayPilotSchedulerComponent;
  @ViewChild("create") create: CreateComponent;
  @ViewChild("edit") edit: EditComponent;
  @ViewChild('basicModal') basicModal: ModalDirective;

  events: any[] = [];
  date;
  Range;
  role: String;
  //other variables
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  name;
  AllEmployeeList;
  MovingFromEmpKey;
  MovingToEmpKey;
  MovingToDate;
  MovingFromDate;
  FromEmp; ToEmp;

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };
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

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };


  config: any = {
    timeHeaders: [
      {
        "groupBy": "Month"
      },
      {
        "groupBy": "Day",
        "format": "dddd"
      },

      {
        "groupBy": "Day",
        "format": "d"
      }
    ],
    scale: "Day",

    cellDuration: 120,
    cellWidth: 150,
    eventHeight: 30,
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    treeEnabled: true,
    treePreventParentUsage: true,
    EventMovingStartEndEnabled: true,
    bubble: new DayPilot.Bubble({
      animation: "fast",
      animated: false
    }),
    timeRangeSelectedHandling: 'Hold',
    contextMenu: new DayPilot.Menu({
      items: [
        // { text: "Edit", onClick: args => this.edit.show(args.source) },
        { text: "Create", onClick: args => this.create.show(args.source.data) }
      ]
    }),
    onEventClicked: args => {
      this.edit.show(args.e).then(data1 => {

        // this.empCalendarActivities();
      });
    },
    onTimeRangeSelect: args => {

    },
    onTimeRangeSelected: args => {
      var checkDate = this.convert_DT(args.start.value)
      var empKey = args.resource;
      this.SchedulingService
        .scheduleEventCheckForCreate(checkDate, empKey, this.OrganizationID)
        .subscribe((data: any[]) => {

          if (data[0].count == 0) {
            var confirmBox = confirm("Employee not working. Do you want to Create Schedule ?");
            if (confirmBox == true) {
              this.create.show(args);
            }

          }
          else {
            this.create.show(args);
          }

        });
    },
    onEventMoved: args => {


    },
    onEventMove: args => {
      // console.log("moving MovingFromEmpKey**" + this.MovingFromEmpKey + " " + this.MovingFromDate);
      // console.log("moving MovingToEmpKey**" + this.MovingToEmpKey + " " + this.MovingToDate);
      // for (var i = 0; i < this.AllEmployeeList.length; i++) {
      //   if (this.AllEmployeeList[i].id == this.MovingFromEmpKey) {
      //     this.FromEmp = this.AllEmployeeList[i].name;
      //   }
      //   if (this.AllEmployeeList[i].id == this.MovingToEmpKey) {
      //     this.ToEmp = this.AllEmployeeList[i].name;
      //   }
      // }

      let obj = {
        resourceEmployee: this.MovingToEmpKey,
        start: this.MovingToDate,
        ScheduleNameKey: args.e.data.ScheduleNameKey,
        MetaEmp: this.employeekey,
        OrganizationID: this.OrganizationID
      };


      this.SchedulingService.SchedulerTimeRangeCheck(args.e.data.ScheduleNameKey, this.convert_DT(this.MovingToDate), this.MovingToEmpKey, this.OrganizationID).subscribe(data => {
        if (data[0].count > 0) {
          this.SchedulingService.SchedulerEventCreate(obj).subscribe(data => {
            this.SchedulingService.SchedulerEventDelete(args.e.data.Assignment_CalenderID, this.employeekey, this.OrganizationID).subscribe(data => {
              this.empCalendarActivities();
              // alert("Moved: " + this.FromEmp + " " + this.MovingFromDate + " to " + this.ToEmp + " " + this.MovingToDate);

            });
          });

        }
        else {
          var confirmBox = confirm("Employee not working in this time range. Do you want to Update Schedule ?");
          if (confirmBox == true) {
            this.SchedulingService.SchedulerEventCreate(obj).subscribe(data => {
              this.SchedulingService.SchedulerEventDelete(args.e.data.Assignment_CalenderID, this.employeekey, this.OrganizationID).subscribe(data => {
                this.empCalendarActivities();
                // alert("Moved: " + this.FromEmp + " " + this.MovingFromDate + " to " + this.ToEmp + " " + this.MovingToDate);

              });
            });
          }
          else {
            args.preventDefault();
            this.empCalendarActivities();
            // alert("Moved: " + this.FromEmp + " " + this.MovingFromDate + " to " + this.ToEmp + " " + this.MovingToDate);    
          }

        }

      });



    },
    onEventMoving: args => {

      this.MovingFromEmpKey = args.e.data.resource;
      this.MovingToEmpKey = args.resource;

      this.MovingToDate = this.convert_DT(args.end.value);
      this.MovingFromDate = this.convert_DT(args.e.data.start);
      console.log(" date :" + this.MovingToDate);
    },
    onEventResize: args => {
      args.cell.disabled = true;
    },
    onBeforeCellRender: args => {
      if (args.cell.start.getDayOfWeek() === 6 || args.cell.start.getDayOfWeek() === 0) {
        args.cell.backColor = "white";
      }
    },
    onBeforeTimeHeaderRender: args => {
      var dayOfWeek = args.header.start.getDayOfWeek();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        args.header.backColor = "orange";
        // args.header.fontWeight = "bold";
      }
    },
  };



  ngAfterViewInit(): void {

    //token starts....
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;


    // this.ds.getResources().subscribe(result =>{  
    //   debugger;
    //    this.config.resources = result});

    var from = this.scheduler.control.visibleStart();
    var to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
    this.config.resources = [];



    this.SchedulingService.employeesForScheduler('Manager', this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {

        this.config.resources = data;
      });


    this.date = DayPilot.Date.today().firstDayOfMonth();

    this.empCalendarActivities();
  }

  createClosed(args) {
    if (args.result) {
      this.events.push(args.result);
      this.scheduler.control.message("Created.");
    }
    this.scheduler.control.clearSelection();
  }

  editClosed(args) {
    if (args.result) {
      this.scheduler.control.message("Updated");
    }
  }
  ViewType() {

    if (this.Range == 'Month') {
      this.config.timeHeaders = [
        {
          "groupBy": "Month"
        },
        {
          "groupBy": "Day",
          "format": "dddd"
        },

        {
          "groupBy": "Day",
          "format": "d"
        }
      ];
      this.config.scale = "Day";
      this.config.cellDuration = 120;
      this.config.cellWidth = 150;
      this.config.days = DayPilot.Date.today().daysInMonth();
      if (this.date) {
        this.config.startDate = this.date;
      }
      else {
        this.config.startDate = DayPilot.Date.today().firstDayOfMonth();
      }
    } else if (this.Range == 'Week') {
      this.config.timeHeaders = [
        {
          "groupBy": "Month"
        },
        {
          "groupBy": "Day",
          "format": "d"
        }
      ];
      this.config.scale = "Day";
      this.config.cellDuration = 120;
      this.config.cellWidth = 200;
      this.config.days = 7;
      // var d = this.date;

      // var weekdate = d.setDate(this.date + 7);
      // var day = d.getDay();
      // var diff = d.getDate() - day + (day == 0 ? -6 : 2);
      // var k = new Date(d.setDate(diff));
      this.config.startDate = this.convert_DT(this.date);
    }
    // ...
    // else if (this.Range == 'Daily') {
    //   this.config.timeHeaders = [
    //     {
    //       "groupBy": "Day",
    //       "format": "dddd, d MMMM yyyy"
    //     },
    //     {
    //       "groupBy": "Hour"
    //     },
    //     {
    //       "groupBy": "Cell",
    //       "format": "mm"
    //     }
    //   ];
    //   this.config.scale = "CellDuration";
    //   this.config.cellDuration = 30;
    //   this.config.days = 1;
    //   if (this.date) {
    //     this.config.startDate = this.date;
    //   }
    //   else {
    //     this.config.startDate = DayPilot.Date.today().firstDayOfMonth();
    //   }

    // }

    // ...
  }
  selecteddate() {
    if (this.Range == 'Week') {
      var d = this.date;
      var day = d.getDay();
      var diff = d.getDate() - day + (day == 0 ? -6 : 2);
      var k = new Date(d.setDate(diff));
      this.config.startDate = this.convert_DT(k);
    }
    else {
      if (this.date) {
        this.config.startDate = this.convert_DT(this.date);
      }
      else {
        this.config.startDate = DayPilot.Date.today().firstDayOfMonth();
      }
    }
  }

  empCalendarActivities() {

    this.SchedulingService
      .empCalendarDetails(this.Range, this.convert_DT(this.date), this.OrganizationID)
      .subscribe((data: any[]) => {
        this.events = data;
      });
  }

}

