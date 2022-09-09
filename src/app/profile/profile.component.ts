import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any ={};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }


  /**
   * Initialize the component loading the data
   * @function ngOnInit
   */
  ngOnInit(): void {
    this.getUser();
  }
  /**
   * display the openUserLoginDialog
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) =>{
      this.user = resp;
      console.log(this.user)
      return this.user;
    })
  }
  /**
   * display the openUserLoginDialog
   * @function openEditProfileDialog
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '380px'
    })
  }
  /**
   * display the openUserLoginDialog
   * @function deleteProfile
   */
  deleteProfile(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This cannnot be undone.'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

}
