import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { UserRegistration } from 'src/app/models/userRegistration.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {

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

  countries = [{
    countryCode: "",
    country: ""
  }]

  classifications = []

  addFishReg = {
    classification: "",
    quantity: 0
  }

  registrationOutput = {}

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (parms) => {
        const id = parms.get('id')

        if (id) {
          this.registration.eventId = id;
          this.eventsService.getEvent(id).subscribe({
            next: (response) => {
              this.event = response.event
              this.countries = response.countries
              this.classifications = response.classifications
            }
          })
        }
      }
    })
  }

  addClass() {
    if (!this.addFishReg.classification || !this.addFishReg.quantity || this.addFishReg.quantity == 0){
      return;
    }

    let found = this.registration.fishRegistration.find((s) => s.classification.includes(this.addFishReg.classification));
    if (found) {
      this.updateFishRegistration(found, this.addFishReg.quantity);
    } else {
      let fishRegistration = {
        classification: this.addFishReg.classification,
        quantity: this.addFishReg.quantity,
        fees: this.event.registration_fees,
        total: this.event.registration_fees * this.addFishReg.quantity
      };
      this.registration.fishRegistration.push(fishRegistration);
    }
  }

  register() {
    this.eventsService.registerEvent(this.registration).subscribe({
      next: (response) => {
        this.router.navigate(['/event-registration/post-event-registration/' + response.userRegistration.id]);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  updateFishRegistration(item: any, qty: number) {
    let index = this.registration.fishRegistration.indexOf(item);
    item.quantity += qty;
    item.total = this.event.registration_fees * item.quantity;
    this.registration.fishRegistration[index] = item;
  }

  deleteFishRegistration(i: number){
    this.registration.fishRegistration.splice(i, 1);
  }
}