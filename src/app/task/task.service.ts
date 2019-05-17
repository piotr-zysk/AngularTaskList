import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from 'selenium-webdriver/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ITask } from './task';
import { SettingsService } from '../shared/settings.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = this.settings.webserverAddress;  // 'api/tasks/tasks.json';

  constructor(private http: HttpClient, private settings: SettingsService) { }

  getTasks(): Observable<ITask[]> {
// tslint:disable-next-line: max-line-length
    // return this.http.get<ITask[]>(this.taskUrl).pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
    return this.http.get<ITask[]>(this.taskUrl).pipe(catchError(this.handleError));
  }


  getTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(this.taskUrl + '/' + id).pipe(catchError(this.handleError));
  }

  updateTask(task: ITask) {

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    if (task.id > 0) {
      return this.http.put<ITask>(this.taskUrl, task, options)
        .pipe(tap(data => console.log(data)), catchError(this.handleError));
    } else {
      task.id = undefined;
      return this.http.post<ITask>(this.taskUrl, task, options)
        .pipe(tap(data => console.log(data)), catchError(this.handleError));
    }
  }


  deleteTask(id: number) {

    return this.http.delete(this.taskUrl + '/' + id)
      .pipe(tap(data => console.log(data)), catchError(this.handleError));
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




