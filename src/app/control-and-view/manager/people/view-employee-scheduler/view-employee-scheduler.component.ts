import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { DayPilot, DayPilotSchedulerComponent } from "daypilot-pro-angular";
import { DataService } from "./data.service";
import { SchedulingService } from '../../../../service/scheduling.service';

@Component({
  selector: 'view-employee-scheduler-component',
  template: `
  <div style="text-align:center;margin-top:2%;margin-bottom:2%">
    <h4 style="color: #174a5e;">EMPLOYEE SCHEDULER</h4>
  </div>
  <div class="row bg-info col-md-12" style="padding-top: 1rem;padding-bottom: 2rem;margin-bottom:2%">
  <div class=" col-md-6" style="margin-top: 3rem">
      <label>Date*</label>
      <ng-datepicker [options]="options" position="top-right" [(ngModel)]="date" (ngModelChange)="selecteddate();empCalendarActivities();"></ng-datepicker><br><br>
      
  </div>
  <div class=" col-md-6" style="margin-top: 3rem">
      <label>View Range*</label>
      <select  [(ngModel)]="Range" (change)='ViewType();empCalendarActivities();' class="form-control col-sm-9 col-md-9 col-lg-9" [value]="value"
          style="background-color: #d4f4ff;">
          <option value="">--Select--</option>
          <option value="Daily">Daily</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
          
        </select>
      
  </div>
  
</div>

  <daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>
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
export class ViewEmployeeSchedulerComponent implements AfterViewInit {

  @ViewChild("scheduler") scheduler: DayPilotSchedulerComponent;

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
    eventMoveHandling: "CallBack",
    timeRangeSelectedHandling: "Enabled",
    
    onEventMoved(args) {
      var dp = this;
      dp.message("Moved: " + args.e.text());
    }
  };

  constructor(private ds: DataService, private cdr: ChangeDetectorRef, private SchedulingService: SchedulingService) { }

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

    this.Range = 'Month';
    // this.ds.getResources().subscribe(result =>{  
    //   debugger;
    //    this.config.resources = result});
    // console.log("start ... "+this.convert_DT());
    var from = this.scheduler.control.visibleStart();
    var to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });

    this.SchedulingService
      .employeesForScheduler(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        // debugger;
        // this.AllEmployeeList = data;
        this.config.resources = [{ name: 'Shift-01', id: 'GA', "expanded": true, children: data, color: 'red' },
        { name: 'Shift-02', id: 'GA', "expanded": true, children: data }
        ]


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
      this.config.days = DayPilot.Date.today().daysInMonth();
      if (this.date) {
        this.config.startDate = this.date;
      }
      else {
        this.config.startDate = DayPilot.Date.today().firstDayOfMonth();
      }
    } else if (this.Range == 'Week') {
      this.config.days = 7;
      var d = this.date;
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 2);
      var k = new Date(d.setDate(diff));
      this.config.startDate = this.convert_DT(k);
    }
    else if (this.Range == 'Daily') {
      this.config.timeHeaders = [
        {
          "groupBy": "Day",
          "format": "dddd, d MMMM yyyy"
        },
        {
          "groupBy": "Hour"
        },
        {
          "groupBy": "Cell",
          "format": "mm"
        }
      ];
      this.config.scale = "CellDuration";
      this.config.cellDuration = 30;
      this.config.days = 1;
      if (this.date) {
        this.config.startDate = this.date;
      }
      else {
        this.config.startDate = DayPilot.Date.today().firstDayOfMonth();
      }

    }
  }
  selecteddate() {
    if (this.Range == 'Week') {
      var d = this.date;
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 2);
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
      .empCalendarDetailsForViewOnly(this.Range, this.convert_DT(this.date), this.OrganizationID)
      .subscribe((data: any[]) => {
        this.events = data;
      });
  }
}
