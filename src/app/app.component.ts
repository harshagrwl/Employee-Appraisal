
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Employee Appraisal';
  public isAuthenticated: boolean;

  ngOnInit() {
    this.isAuthenticated = false;
  }

  login() {
  }

  logout() {
  }
}