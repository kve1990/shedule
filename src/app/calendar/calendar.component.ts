import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

import { EventsService } from '../events.service';

import { IEvent } from '../IEvent';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    @Output() getEventsList = new EventEmitter();

    private date: Date;         // текущая дата
    private dateLast: number;   // последний день месяца
    private dateWLast: number;  // день недели последнего дня месяца
    private dateWFirst: number; // день недели первого дня месяца

    private firstDays: number[] = []; // дни прошедшего месяца в первой неделе
    private currentDays = [];         // дни текущего месяца
    private lastDays: number[] = [];  // дни следующего месяца в последней неделе

    private details = [];
    private today: number;    // текущий день
    private events: IEvent[]; // мероприятия

    constructor(private _service:EventsService){

    }

    ngOnInit(){
    	this.date = new Date();             // текущая дата
    	let year = this.date.getFullYear(); // текущий год
    	let month = this.date.getMonth();   // текущий месяц

    	this.dateLast = new Date(year, month+1, 0).getDate();          // последний день месяца
    	this.dateWLast = new Date(year, month,this.dateLast).getDay(); // день недели последнего дня месяца
    	this.dateWFirst = new Date(year, month,1).getDay();            // день недели первого дня месяца

    	this.today = this.date.getDate(); // текущий день

        // клетки до первого дня текущего месяца
    	if(this.dateWFirst != 0){
    		for(var i=1; i<this.dateWFirst; i++) this.firstDays.push(i);
    	}else{
    		for(var i=0;i<6;i++) this.firstDays.push(i);
    	}

        // дни месяца
    	for(var i = 1; i<=this.dateLast; i++){
    		this.currentDays.push({day: i, events: [], active: false});
    	}

        // клетки после последнего дня месяца
    	if(this.dateWLast != 0){
    		for(var i = this.dateWLast; i<7; i++) this.lastDays.push(i);
    	}

        // получаем мероприятия
        this._service.getEventsList().subscribe(res => {

            this.events = res; // массив мероприятий

            this.events.forEach(event => {

                // если мероприятия принадлежат текущему месяцу и году
                if ( (new Date(event.date)).getFullYear() === year && (new Date(event.date)).getMonth() === month ){

                    let date = (new Date(event.date)).getDate(); // дата проведения мероприятия

                    // если сегодня есть мерориятия, то при инициализации показываем их
                    if(date === this.today){
                        this.details.push(event);
                    }

                    // распределяем мероприятия по дням месяца
                    this.currentDays.forEach(i => {
                        if(i.day === this.today) i.active = true;
                        if(i.day === date) i.events.push(event);
                    });

                    // исходящие данные
                    this.getEventsList.emit(this.details);
                }
            });
        });

    	

    }

    getDetailsDay(item){

    	this.today = item.day; // изменяем текущий день
    	this.details = [];     // очищаем массив мероприятий

        // получаем мероприятия
        this._service.getEventsList().subscribe(res => {

            this.events = res; // массив мероприятий

            this.events.forEach(event => {

              let date = (new Date(event.date)).getDate(); // дата проведения мероприятия

              // показываем мероприятия выбранной даты
              if(date === this.today){
                  this.details.push(event);
              }
            });

            this.currentDays.forEach(day => day.active = false);
            item.active = true;

            // исходящие данные
            this.getEventsList.emit(this.details);
        });
    }
}
