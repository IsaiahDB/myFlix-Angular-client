import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  /**
   * Initialize the component loading the data
   * @function ngOnInit
   */
  ngOnInit(): void {}

  /**
   * navigates to movies (main) page
   * @function goToMovies
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigates to user profile
   * @function goToProfile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out users, clears local storage to reset token and user
   * @function logOut
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}