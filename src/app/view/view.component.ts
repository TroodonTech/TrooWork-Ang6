import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Login } from '../login';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
games:Login[];
  constructor(private loginService: LoginService) { }
   loginFn(userName,passWord,tenantID) {
 
      this.loginService.login(userName,passWord,tenantID);
  }

  ngOnInit() {
      this.loginService
      		.getmessage()
      		.subscribe((data: Login[]) => {
        		this.games = data;
                        // debugger;
        });
  }

}
