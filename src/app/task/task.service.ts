import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from 'selenium-webdriver/http';
import { Observable, throwError, pipe, timer, zip, range, concat, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, retry, retryWhen, map, mergeMap, concatMap, take } from 'rxjs/operators';
import { ITask } from './task';
import { SettingsService } from '../shared/settings.service';

function backoff(maxTries, ms) {
  return pipe(
    tap(() => throwError('oops')),
    retryWhen(attempts => zip(range(1, maxTries), attempts)
      .pipe(
        map(([i]) => i * i),
        mergeMap(i =>  {
            if (i === maxTries * maxTries) {
                return throwError('Unable to load tasks. Check connection to the server.')
              };
              return timer(i * ms);} )
      )
    )
  );
  }

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = this.settings.webserverAddress;  // 'api/tasks/tasks.json';

  constructor(private http: HttpClient, private settings: SettingsService) { }


  getTasks() {
// tslint:disable-next-line: max-line-length
    // return this.http.get<ITask[]>(this.taskUrl).pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
    return this.http.get<ITask[]>(this.taskUrl).pipe(
      backoff(3, 250),
      take(2),
      catchError(this.handleErrorAny)
      );      //catchError(this.handleError));
  }

  getTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(this.taskUrl + '/' + id).pipe(catchError(this.handleError));
  }

  upsertTask(task: ITask): Observable<ITask> {

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    if (task.id > 0) {
      return this.http.put<ITask>(this.taskUrl, task, options)
        .pipe(tap(data => console.log(data)), catchError(this.handleError));
    } else {
      task.id = undefined;
      return this.http.post<ITask>(this.taskUrl, task, options)
        .pipe(catchError(this.handleError));
    }
  }


  deleteTask(id: number) {
    //console.log(id);
    return this.http.delete(this.taskUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleErrorAny(errorMessage: string)
  {
    //console.error(errorMessage);
    return throwError(errorMessage);
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




