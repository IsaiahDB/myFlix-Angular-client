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
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

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

  getUser(user: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    return this.http
      .get(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

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

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

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