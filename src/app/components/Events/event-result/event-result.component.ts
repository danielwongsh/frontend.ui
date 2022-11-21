import { TypeofExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-result',
  templateUrl: './event-result.component.html',
  styleUrls: ['./event-result.component.css']
})
export class EventResultComponent implements OnInit {
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

  thisYear = (new Date()).getFullYear();

  searchParm = "";

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (parms) => {
        const id = parms.get('id')
        const searchParm = parms.get('searchParm')

        if (id) {
          let req = {
            id: id
          }
          this.eventsService.getEventResult(req).subscribe({
            next: (response) => {
              this.event = response.event
              this.classGroups = response.groups
              this.entries = response.entries
              this.fishRegistration = response.fishRegistration
              this.generateClassDivisions(this.classGroups);
            }
          })
        }

        if (searchParm) {
          this.searchParm = searchParm;
        }
      }
    })
  }

  getEntries(fishClass: string, fishSubclass: string): number {
    const entries = this.entries.filter(x => x.fish_class == fishClass && x.fish_subclass == fishSubclass);
    if (entries && entries.length > 0){
      return entries[0].entries;
    }
    return 0;
  }

  getFishRegSeq(event: any, fishClass: string = "", fishSubclass: string = "") {
    const foundList = this.fishRegistration.filter(x => x.seq == event.target.value);
    if (foundList && foundList.length > 0) {
      let found = {}
      if (fishClass && fishSubclass) {
        const isFound = foundList.filter(x => x.mainclassification === fishClass && x.classification === fishSubclass && x.seq == event.target.value);
        if (isFound && isFound.length > 0){
          found = isFound[0]
        }
      } else if (fishClass) {
        const isFound = foundList.filter(x => x.mainclassification === fishClass && x.seq == event.target.value);
        if (isFound && isFound.length > 0){
          found = isFound[0]
        }
      } else {
        found = foundList[0];
      }
      const splitStr = event.target.id.split('_');
      if (splitStr && splitStr.length > 0){
        this.updateClassDivision(found, splitStr[0], event.target.value);
      }
    }
  }

  generateClassDivisions(classGroups: any[]) {
    for (var i = 0; i < classGroups.length; i++){
      let division = {
        division: classGroups[i].fish_class,
        subDiv: [{}],
        bestDiv: {},
        totalEntries: 0
      };
      division.subDiv.shift();
      for (var j = 0; j < classGroups[i].fish_subclass.length; j++) {
        const fish_class = classGroups[i].fish_subclass[j].fish_class;
        const fish_subclass = classGroups[i].fish_subclass[j].fish_subclass;
        const description = classGroups[i].fish_subclass[j].description;
        const entries = this.getEntries(fish_class, fish_subclass);
        division.totalEntries += entries;
        let subDiv = {
          fish_class: fish_class,
          fish_subclass: fish_subclass,
          description: description,
          entries: entries
        }
        division.subDiv.push(subDiv);
      }
      this.divisionsResult.push(division);
    }
  }

  updateClassDivision(found: any, place: string, seq: string) {
    const foundDiv = this.divisionsResult.find((x: { division: any; }) => x.division === found.mainclassification);
    if (foundDiv) {
      const ind = this.divisionsResult.indexOf(foundDiv);
      if (ind >= 0){
        const foundSubDiv = this.divisionsResult[ind].subDiv.find((x: { fish_class: any; fish_subclass: any; seq: any; }) => x.fish_class === found.mainclassification && x.fish_subclass === found.classification);
        if (foundSubDiv) {
          const subInd = this.divisionsResult[ind].subDiv.indexOf(foundSubDiv);
          if (subInd >= 0) {
            if (place === "class1st") {
              this.divisionsResult[ind].subDiv[subInd].class1st = seq;
              this.divisionsResult[ind].subDiv[subInd].class1stName = found.name;
            } else if (place === "class2nd") {
              this.divisionsResult[ind].subDiv[subInd].class2nd = seq;
              this.divisionsResult[ind].subDiv[subInd].class2ndName = found.name;
            } else if (place === "class3rd") {
              this.divisionsResult[ind].subDiv[subInd].class3rd = seq;
              this.divisionsResult[ind].subDiv[subInd].class3rdName = found.name;
            } else if (place === "bestOf") {
              this.divisionsResult[ind].bestDiv.seq = seq;
              this.divisionsResult[ind].bestDiv.name = found.name;
              this.divisionsResult[ind].bestDiv.subclass = found.classification;
            } else if (place === "bestOfShow") {
              this.bestOfShow.name = found.name;
              this.bestOfShow.class = found.mainclassification;
              this.bestOfShow.subclass = found.classification;
            } else if (place === "bestOfOpt") {
              this.bestOfOpt.name = found.name;
              this.bestOfOpt.class = found.mainclassification;
              this.bestOfOpt.subclass = found.classification;
            }
          }
        }
      }
    }
  }

  compileResult() {
    const resultReq = {
      id: this.event.id,
      divisionsResult: this.divisionsResult,
      bestOfShow: this.bestOfShow,
      bestOfOpt: this.bestOfOpt
    }
    this.eventsService.submitEventResult(resultReq).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/maintain-event-registration']);
      }
    })
  }
}
