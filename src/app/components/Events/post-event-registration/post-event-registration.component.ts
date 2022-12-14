import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { UserRegistration } from 'src/app/models/userRegistration.model';
import { EventsService } from 'src/app/services/events.service';
import { RegistrationService } from 'src/app/services/registration.service';

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
    statusDesc: "",
    EventID: "",
    fishRegistration: [],
  }

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
  }

  paynow: string = "";

  constructor(private registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (parms) => {
        const id = parms.get('id')

        if (id) {
          this.registrationService.getUserRegistration(id).subscribe({
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
