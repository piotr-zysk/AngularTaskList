import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './home/welcome.component';
import { TaskModule } from './task/task.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
