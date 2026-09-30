import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Common } from './services/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('enquiry_management');

  loggedUserName: string = '';

  commonSr = inject(Common);

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.readLoggedUserData();
      this.commonSr.$onLogin.subscribe({
        next: () => {
          this.readLoggedUserData();
        },
      });
    }
  }

  readLoggedUserData() {
    const storedUserName = window.localStorage.getItem('enquiryApp');
    if (storedUserName) {
      this.loggedUserName = storedUserName;
    }
  }
}
