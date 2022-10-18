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

  fish_classification = {
    fish_class: "",
    fish_subclass: "",
    description: "",
    fee: 0
  }

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

  addClassification() {
    if (!this.fish_classification.fish_class || !this.fish_classification.fish_subclass || !this.fish_classification.description || this.fish_classification.fee == 0){
      return;
    }

    let found = this.event.fish_classifications.find((s) => s.fish_class.includes(this.fish_classification.fish_class) && s.fish_subclass.includes(this.fish_classification.fish_subclass));
    if (found) {
      found.fish_class = this.fish_classification.fish_class;
      found.fish_subclass = this.fish_classification.fish_subclass;
      found.description = this.fish_classification.description;
      found.fee = this.fish_classification.fee;
    } else {
      let fish_classification_toadd = {
        fish_class: this.fish_classification.fish_class,
        fish_subclass: this.fish_classification.fish_subclass,
        description: this.fish_classification.description,
        fee: this.fish_classification.fee
      };
      this.event.fish_classifications.push(fish_classification_toadd);
    }
  }

  deleteClassification(i: number) {
    this.event.fish_classifications.splice(i, 1);
  }
}
