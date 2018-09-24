import { Component, OnInit } from '@angular/core';
import { People } from '../../../Model-Class/People';
import { PeopleServiceService } from '../../../service/people-service.service';

@Component({
  selector: 'app-manage-login-credentials',
  templateUrl: './manage-login-credentials.component.html',
  styleUrls: ['./manage-login-credentials.component.scss']
})
export class ManageLoginCredentialsComponent implements OnInit {
  loginCreds: People[];
  pageNo: Number = 1;
  itemsPerPage: Number = 10;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;
  constructor(private peopleServiceService: PeopleServiceService) { }

  previousPage() {
    this.pageNo = +this.pageNo - 1;
    this.peopleServiceService.getLoginCredentialList(this.pageNo, this.itemsPerPage).subscribe((data: People[]) => {
      this.loginCreds = data;
      if (this.pageNo == 1) {
        this.showHide2 = true;
        this.showHide1 = false;
      } else {
        this.showHide2 = true;
        this.showHide1 = true;
      }
    });
  }

  nextPage() {
    this.pageNo = +this.pageNo + 1;
    this.peopleServiceService.getLoginCredentialList(this.pageNo, this.itemsPerPage).subscribe((data: People[]) => {
      this.loginCreds = data;
      this.pagination = +this.loginCreds[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
      // console.log("pagination: "+this.pagination);
      if (this.pagination > 1) {
        this.showHide2 = true;
        this.showHide1 = true;
      }
      else {
        this.showHide2 = false;
        this.showHide1 = true;
      }
    });
  }

  ngOnInit() {
    this.peopleServiceService.getLoginCredentialList(this.pageNo, this.itemsPerPage).subscribe((data: People[]) => {
      this.loginCreds = data;
      // console.log(this.loginCreds[0].totalItems);
      if (this.loginCreds[0].totalItems > this.itemsPerPage) {
        this.showHide2 = true;
        this.showHide1 = false;
      }
      else if (this.loginCreds[0].totalItems <= this.itemsPerPage) {
        this.showHide2 = false;
        this.showHide1 = false;
      }
    });
  }

}
