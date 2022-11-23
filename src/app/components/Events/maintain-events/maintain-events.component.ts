import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-maintain-events',
  templateUrl: './maintain-events.component.html',
  styleUrls: ['./maintain-events.component.css']
})
export class MaintainEventsComponent implements OnInit {

  events: any[] = [];
  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents().subscribe({
      next: response => {
        this.events = response.events;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  deleteEvent(event: Events) {
    this.eventsService.deleteEvent(event).subscribe({
      next: (response) => {
        this.events = response.events;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
