import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { UserRegistration } from 'src/app/models/userRegistration.model';
import { RegistrationService } from 'src/app/services/registration.service';

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
  
  classi: any = ""

  addFishReg = {
    mainclassification: "",
    classification: "",
    fee: 0,
    quantity: 0
  }

  registrationOutput = {}

  constructor(private registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (parms) => {
        const id = parms.get('id')

        if (id) {
          this.registration.EventID = id;
          this.registrationService.GetUserRegistrationEvent(id).subscribe({
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

    let found = this.registration.fishRegistration.find((s) => s.mainclassification.includes(this.addFishReg.mainclassification) && s.classification.includes(this.addFishReg.classification));
    if (found) {
      this.updateFishRegistration(found, this.addFishReg.quantity);
    } else {
      let fishRegistration = {
        mainclassification: this.addFishReg.mainclassification,
        classification: this.addFishReg.classification,
        quantity: this.addFishReg.quantity,
        fees: this.addFishReg.fee,
        total: this.addFishReg.fee * this.addFishReg.quantity
      };
      this.registration.fishRegistration.push(fishRegistration);
      this.registration.fishRegistration.sort((a, b)=> {
        return a.classification < b.classification ? -1 : 1
      })
    }
  }

  register() {
    this.registrationService.registerEvent(this.registration).subscribe({
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
    item.total = this.addFishReg.fee * item.quantity;
    this.registration.fishRegistration[index] = item;
  }

  deleteFishRegistration(i: number){
    this.registration.fishRegistration.splice(i, 1);
  }

  classificationChange() {
    this.addFishReg.mainclassification = this.classi.fish_class;
    this.addFishReg.classification = this.classi.fish_subclass;
    this.addFishReg.fee = this.classi.fee;
  }
}
