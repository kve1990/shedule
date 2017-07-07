import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class EventsService {

  constructor(private http:Http) { }

  getEventsList(){
  	return this.http.request('assets/events.json')
  			 .map(res => res.json());
  }

}
