import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-edit-event-result',
  templateUrl: './edit-event-result.component.html',
  styleUrls: ['./edit-event-result.component.css']
})
export class EditEventResultComponent implements OnInit {
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

  classGroups:any[] = [];
  entries:any[] = [];
  fishRegistration:any[] = [];

  bestOfShow:any = {};
  bestOfOpt:any = {};
  divisionsResult:any = []
  result:any = {};

  thisYear = (new Date()).getFullYear();

  searchParm = "";

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (parms) => {
        const id = parms.get('id')

        if (id) {
          let req = {
            id: id
          }
          this.eventsService.editEventResult(req).subscribe({
            next: (response) => {
              console.log(response);
              this.event = response.event;
              this.result = response.result;
              this.divisionsResult = response.divisions;
              this.fishRegistration = response.fishRegistration
            },
            error: (response) => {
              console.log(response);
            }
          })
        }
      }
    })
  }

  getFishRegSeq(inputObj: any, seq = "", name = "", classname = "", subclass = "", fishClass = "", fishSubClass = "") {
    let foundList:any = [];
    if (fishClass && fishSubClass) {
      foundList = this.fishRegistration.filter(x => x.seq == inputObj[seq] && x.mainclassification === fishClass && x.classification === fishSubClass);
    } else if (fishClass) {
      foundList = this.fishRegistration.filter(x => x.seq == inputObj[seq] && x.mainclassification === fishClass);
    } else {
      foundList = this.fishRegistration.filter(x => x.seq == inputObj[seq]);
    }
    if (foundList && foundList.length > 0) {
      const found = foundList[0];
      if (seq) {
        inputObj[seq] = found.seq;
      }
      if (name) {
        inputObj[name] = found.name;
      }
      if (classname) {
        inputObj[classname] = found.mainclassification;
      }
      if (subclass) {
        inputObj[subclass] = found.classification;
      }
    } else {
      if (seq) {
        inputObj[seq] = "";
      }
      if (name) {
        inputObj[name] = "";
      }
      if (classname) {
        inputObj[classname] = "";
      }
      if (subclass) {
        inputObj[subclass] = "";
      }
    }
  }

  updateResult() {
    const resultReq = {
      id: this.result.id,
      result: this.result,
      divisionsResult: this.divisionsResult
    }
    this.eventsService.updateEventResult(resultReq).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/maintain-events']);
      }
    })
  }
}
