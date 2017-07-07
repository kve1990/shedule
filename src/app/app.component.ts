import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as locales from 'moment/min/locales';

moment.locale('ru-ru');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 private date: number;

 constructor(){
 	this.date = (new Date).getTime();
 }
}
