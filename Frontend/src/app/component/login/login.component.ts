import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Login } from "../../model/loginModel";
import { LoginService } from "../../service/login.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../service/authentication.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj !: Login;
  value1!: string;
  value2!: string;
  value3!: string;
  value4!: string;
  value5!: string;
  value6!: string;
  value7!: string;

  customerdata: any;
  flag = false;

  constructor(private loginApi: LoginService, private router: Router, private authenticate: AuthenticationService) { }

  registerForm!: FormGroup;
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.getCustomers();
    this.authenticate.logout();

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.loginForm = new FormGroup({
      emailLogin: new FormControl('', [Validators.required]),
      passwordLogin: new FormControl('', [Validators.required])
    });
  }

  registerShow = false;
  loginShow = true;
  /* Method for Hiding Login Form and Making Registeration Form Visible */
  switchToRegister() {
    this.loginShow = false;
    this.registerShow = true;
  }
  /* Method for Hiding Registeration Form and Making Login Form Visible */
  switchToLogin() {
    this.registerShow = false;
    this.loginShow = true;
  }

  /* Method For Getting Registeration Form Data and Pushing into Database */
  postCustomerDetails() {
    this.value1 = this.registerForm.value.name;
    this.value2 = this.registerForm.value.email;
    this.value3 = this.registerForm.value.mobileNo;
    this.value4 = this.registerForm.value.address;
    this.value5 = this.registerForm.value.password;
    this.loginObj = new Login(this.value1, this.value2, this.value3, this.value4, this.value5);
    this.loginApi.postCustomer(this.loginObj)
      .subscribe(res => {
        this.customerdata = res;
        alert("User Registered Succesfully");
        this.registerForm.reset();
        this.getCustomers();
      })
  }

  /* Method Getting Customers Details */
  getCustomers() {
    this.loginApi.getCustomer()
      .subscribe(res => {
        this.customerdata = res;
      })
  }

  /* Method For Login Credetials Validation && Login */ 
  checkForLogin() {
    this.value6 = this.loginForm.value.emailLogin;
    this.value7 = this.loginForm.value.passwordLogin;
    for (let i = 0;i< this.customerdata.length; i++) {
      if (this.customerdata[i].email = this.value6 && this.customerdata[i].password == this.value7) {
        this.flag = true;
        break;
      }
    }
    if (this.flag) {
      this.authenticate.login();
      alert("Logined Successfully");
      this.router.navigate(['products']);
    }
    console.log("Here");
  }

  get name() {
    return this.registerForm.get("name");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get mobileNo() {
    return this.registerForm.get("mobileNo");
  }

  get address() {
    return this.registerForm.get("address");
  }

  get password() {
    return this.registerForm.get("password")
  }

  get emailLogin() {
    return this.loginForm.get("emailLogin");
  }
  
  get passwordLogin() {
    return this.loginForm.get("passwordLogin");
  }

}
