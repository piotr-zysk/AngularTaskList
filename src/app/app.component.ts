import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterAnimation } from './animations';

@Component({
  selector: 'tl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    RouterAnimation
  ]
})
export class AppComponent {
  title = 'AngularTaskList';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
