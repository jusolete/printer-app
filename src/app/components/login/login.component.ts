import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  loginObject: any = {
    mail: '',
    userPassword: ''
  }

  errorMsg: string = "";

  validationErrors: boolean = false;

  loginErrors: boolean = false;

  ngOnInit() {

  }


  login() {
    if (this.loginObject.mail != '' && this.loginObject.userPassword != '') {
      this.validationErrors = false;
      this.loginErrors = false;
      this.loginService.login(this.loginObject).subscribe(response => {
        if (response['ok'] === true) {
          localStorage.setItem('authData', JSON.stringify(response['userResponse']));
        }
      }, (error) => {
        this.errorMsg = error.error.err;
        debugger
        this.loginErrors = true;

      });
    } else {
      this.validationErrors = true;
    }

  }


}
