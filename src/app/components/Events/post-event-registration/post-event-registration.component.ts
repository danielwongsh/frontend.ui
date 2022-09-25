import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { UserRegistration } from 'src/app/models/userRegistration.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-post-event-registration',
  templateUrl: './post-event-registration.component.html',
  styleUrls: ['./post-event-registration.component.css']
})
export class PostEventRegistrationComponent implements OnInit {

  registration: UserRegistration = {
    id: "",
    name: "",
    contact: "",
    country: "",
    email: "",
    refCode: "",
    total_fees: 0.00,
    status: "",
    eventId: "",
    fishRegistration: [],
  }

  event: Events = {
    id: "",
    name: "",
    description: "",
    registration_fees: 0.00
  }

  paynow: string = "";

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (parms) => {
        const id = parms.get('id')

        if (id) {
          this.eventsService.getUserRegistration(id).subscribe({
            next: (response) => {
              this.registration = response.userRegistration
              this.registration.fishRegistration = response.fishRegistration
              this.paynow = response.paynow
              this.event = response.event
            }
          })
        }
      }
    })
  }

}
