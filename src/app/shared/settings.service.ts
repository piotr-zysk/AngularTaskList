import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  webserverAddress: string = 'api/tasks/tasks.json';

  constructor() { }
}
