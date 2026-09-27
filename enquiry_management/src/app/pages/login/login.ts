import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Common } from '../../services/common';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  userLogin: any = {
    userName: '',
    password: '',
  };

  router = inject(Router);
  commonSr = inject(Common);

  onLogin() {
    if (this.userLogin.userName === 'admin@gmail.com' && this.userLogin.password === 'password') {
      // Handle successful login
      localStorage.setItem('enquiryApp', this.userLogin.userName);
      this.commonSr.$onLogin.next();
      this.router.navigateByUrl('/status');
    } else {
      // Handle failed login
      alert('Invalid username or password. Please try again.');
    }
  }
}
