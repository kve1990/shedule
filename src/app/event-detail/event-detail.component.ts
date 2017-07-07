import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event = '';

  constructor(private _route: ActivatedRoute, private _service:EventsService) { }

  ngOnInit() {
  	let id = this._route.snapshot.params['id'];
  	this._service.getEventsList().subscribe(res => {
      /*
       * Правильно делать запрос на конкретное мероприятие, но
       * сейчас удобнее получить из общего массива мероприятий
       */
  		this.event = res[res.map(res => res.id).indexOf(+id)];
  	});
  }

}
