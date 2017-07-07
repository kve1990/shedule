import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from "@angular/core";

import { routing } from './app.routing';

import {MdIconModule, MdIconRegistry, MdButtonModule, MdMenuModule} from '@angular/material';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

import { EventsService } from './events.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventListComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdIconModule,
    MomentModule,
    MdButtonModule,
    MdMenuModule,
    routing
  ],
  providers: [MdIconRegistry, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
