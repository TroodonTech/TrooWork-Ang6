import { Component, OnInit } from '@angular/core';
import { People } from '../../../Model-Class/People';
import { PeopleServiceService } from '../../../service/people-service.service';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-pass-word',
  templateUrl: './reset-pass-word.component.html',
  styleUrls: ['./reset-pass-word.component.scss']
})
export class ResetPassWordComponent implements OnInit {
  empKey$: Object;
  response: Object;
  managerMail: Object;
  userMail: Object;
  build: People[];

  constructor(private route: ActivatedRoute, private peopleService: PeopleServiceService, private http: HttpClient) {
    debugger;
    this.route.params.subscribe(params => this.empKey$ = params.EmpKey);
  }

  resetUserPassword(username, password, userLoginId) {
    this.peopleService.resetUserPassword(username, password, this.empKey$, userLoginId).subscribe((data: People[]) => {
      this.response = data[0];
      this.build = data;
    });

    if (this.build.length > 0) { // resetUserPassword returns username. just to make sure that the reset action was done properly, we are returnig the username
      debugger;
      this.peopleService.getUserEmail(username).subscribe((data: People[]) => {
        debugger;
        this.managerMail = data[0].EmailID;
        this.userMail = data[0].newmail;
        
        if (this.userMail == null) {
          alert("Password Changed Successfully! Mail not send , Mail-Id not found !");
        } else {
          var message = 'Your Username is ' + username + ' and ' + 'Your Password is ' + password + "                https://troowork.azurewebsites.net";
          console.log(message);
          const obj = {
            from: this.managerMail,
            to: this.userMail,
            subject: 'Login Credentials',
            text: message
          };
          const uri = "http://localhost:3000/api/sendmail";
          return this.http.post(uri, obj)
            .subscribe(res => console.log('Mail Sent Successfully...'));
        }

      });

    }
  }
  ngOnInit() {

    this.peopleService.getLoginDetailsByEmpKey(this.empKey$).subscribe((data: People[]) => {
      this.build = data;
      // debugger;
    });

  }
}