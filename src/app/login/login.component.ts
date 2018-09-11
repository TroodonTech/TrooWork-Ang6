import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 loginForm: FormGroup; constructor(private fb: FormBuilder,private loginService: LoginService) {

    this.loginForm = fb.group({
        userName: ['', Validators.required],
        tenantID: ['', Validators.required],
        passWord: ['', [Validators.required, Validators.minLength(8)]]
      });
  }
  loginFn(userName,passWord,tenantID) {
 
      this.loginService.login(userName,passWord,tenantID);
  }

  ngOnInit() {
  }

}
