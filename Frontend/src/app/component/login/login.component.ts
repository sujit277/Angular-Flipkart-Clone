import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../../model/loginModel';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObj!: Login;
  customerdata: any;
  userName: any;
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  registerShow = false;
  loginShow = true;
  flag = false;

  constructor(
    private loginApi: LoginService,
    private router: Router,
    private authenticate: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.authenticate.logout();

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginForm = new FormGroup({
      emailLogin: new FormControl('', [Validators.required]),
      passwordLogin: new FormControl('', [Validators.required]),
    });
  }

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
    this.loginObj = new Login(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.mobileNo,
      this.registerForm.value.address,
      this.registerForm.value.password
    );
    this.loginApi.postCustomer(this.loginObj).subscribe((res) => {
      this.customerdata = res;
      alert('User Registered Succesfully');
      this.registerForm.reset();
      this.getCustomers();
    });
  }

  /* Method Getting Customers Details */
  getCustomers() {
    this.loginApi.getCustomer().subscribe((data) => {
      this.customerdata = data;
    });
  }

  /* Method For Login Credetials Validation && Login */
  checkForLogin() {
    for (let i = 0; i < this.customerdata.length; i++) {
      if (
        this.customerdata[i].email == this.loginForm.value.emailLogin &&
        this.customerdata[i].password == this.loginForm.value.passwordLogin
      ) {
        this.flag = true;
        this.userName = this.customerdata[i].name;
        break;
      }
    }
    if (this.flag) {
      this.authenticate.login();
      alert('Logined Successfully');
      localStorage.setItem('UserName', this.userName);
      this.router.navigate(['/']);
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get mobileNo() {
    return this.registerForm.get('mobileNo');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get emailLogin() {
    return this.loginForm.get('emailLogin');
  }

  get passwordLogin() {
    return this.loginForm.get('passwordLogin');
  }
}
