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
    venue: '',
    show_host: '',
    show_chair: '',
    show_type: '',
    show_date_start: new Date(),
    show_date_end: new Date(),
    show_head_judge: '',
    show_judges: '',
    show_judge_apprentices: '',
    fish_classifications: []
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
