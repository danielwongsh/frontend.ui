import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { UserRegistration } from 'src/app/models/userRegistration.model';
import { EventsService } from 'src/app/services/events.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {
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

  countries = [{
    countryCode: "",
    country: ""
  }]

  classifications:any[] = []

  searchParm = "";

  constructor(private registrationService: RegistrationService, private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (parms) => {
        const id = parms.get('id')
        const searchParm = parms.get('searchParm')

        if (id) {
          this.registrationService.getUserRegistration(id).subscribe({
            next: (response) => {
              this.countries = response.countries
              this.registration = response.userRegistration
              this.registration.fishRegistration = response.fishRegistration
              this.event = response.event
              this.classifications = response.classifications
            }
          })
        }

        if (searchParm) {
          this.searchParm = searchParm;
        }
      }
    })
  }

  update() {
    this.registrationService.updateUserRegisterEvent(this.registration).subscribe({
      next: (response) => {
        // this.router.navigate(['/maintain-event-registration']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  updatePayment(evt_id: string, ref_code: string) {
    const req = {
      id: evt_id,
      ref_code: ref_code
    }
    this.eventsService.updatePayment(req).subscribe({
      next: (response) => {
        this.registration = response.userRegistration
        this.registration.fishRegistration = response.fishRegistration
      }
    })
  }

  classificationChange(r: any) {
    let splitStr = r.mixclass.split("|");
    if (splitStr && splitStr.length == 2){
      r.mainclassification = splitStr[0];
      r.classification = splitStr[1];
    }
  }
}
