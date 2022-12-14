import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = "https://manymovies.herokuapp.com/"

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
 /**
   * calls API endpoint to register a new user
   * @param userDetails
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to login an existing user
   * @param userDetails
   * @returns data of the user in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
  // API call to get all movies
  getAllMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to get data on a single movie specified by its title
   * @param title
   * @returns JSON object holding movie data
   */
  // Get a movie
  getMovie(title: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * calls API endpoint to get data on a director
   * @param name
   * @returns JSON obejct holding director data
   */
  // Get movie director
  getDirector(name: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * calls API endpoint to get data on a genre
   * @param genre
   * @returns JSON object holding genre data
   */
  // Display movie genre data
  getGenre(genre: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get( apiUrl + 'genres/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
   /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */
  // Get user profile
  getUser(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * calls API endpoint to allow user to update their user information
   * @param userData
   * @returns JSON object holding data about the updated user
   */
  //Edit user information
  editUser(userData:any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('username');
    return this.http
      .put(apiUrl + 'users/' + username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * calls API endpoint to get user a movie to the user's list of favorite movies
   * @returns JSON object holding data about the updated user
   */
  //Get movies from one user profile
  getFavoriteMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param ID
   * @returns JSON object holding data about the updated user
   */
  // Add movie to user favorite movie list
  addFavoriteMovie( Id: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const user = localStorage.getItem('username');
    return this.http
      .post(apiUrl + `users/${user}/favorites/${Id}`,{},   {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
   /**
   * calls API endpoint to remove a movie from the user's list of favorite movies
   * @param ID
   * @returns JSON object holding data about the updated user
   */
  // Remove favorite movie
  removeFavoriteMovie(Id: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + 'users/' + username + '/favorites/' + Id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * calls API endpoint to delete a user from user lsit
   * @returns JSON object holding data about the updated user
   */
//Delete a user 
  deleteUser(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
   /**
   * extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

/**
 * Error handle function
 * @param {HttpErrorResponse} error
 * @function handleError
 */
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}