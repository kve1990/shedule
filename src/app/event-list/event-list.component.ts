import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import * as moment from 'moment';
import * as locales from 'moment/min/locales';

moment.locale('ru-ru');

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100px)'}),
        animate(120)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(-100px)'}))
      ])
    ])
  ]
})
export class EventListComponent implements OnInit {

  details;

  constructor() { }

  ngOnInit() {
  }

  handleEvents(events){
  	this.details = events;
  }

}
