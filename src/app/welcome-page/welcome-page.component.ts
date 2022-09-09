import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component"
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  /**
   * Initialize the component loading the data
   * @function ngOnInit
   */
  ngOnInit(): void {}

  /**
   * display the UserRegistrationComponent
   * @function openUserRegistrationDialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    })
  }
  /**
   * display the openUserLoginDialog
   * @function openUserRegistrationDialog
   */
  openUserLoginDialog(): void{
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    })
  }

}
