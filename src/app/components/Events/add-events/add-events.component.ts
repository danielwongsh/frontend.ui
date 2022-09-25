import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

  event: Events = {
    id: "",
    name: "",
    description: "",
    registration_fees: 0.00
  };
  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
  }

  addEvent() {
    this.eventsService.addEvent(this.event).subscribe({
      next: (response) => {
        //this.event = response.events;
        this.router.navigate(['/maintain-events']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
