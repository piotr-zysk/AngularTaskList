import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  webserverAddress: string = 'http://localhost/tasklist/api'; //'api/tasks/tasks.json';

  constructor() { }
}
