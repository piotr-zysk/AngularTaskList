import { Injectable } from '@angular/core';
//import { HttpClient, HttpErrorResponse } from 'selenium-webdriver/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ITask } from './task';
import { SettingsService } from '../shared/settings.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = this.settings.webserverAddress;  //'api/tasks/tasks.json';

  constructor(private http: HttpClient, private settings: SettingsService) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.taskUrl).pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
  }


  getTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(this.taskUrl+'/'+id).pipe(tap(data => console.log(id + ': ' + JSON.stringify(data))), catchError(this.handleError));

    /*
    {
      "id": id,
      "name": "dupa"+id,
      "description": "blabla",
      "done": false
    }
    */
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}




