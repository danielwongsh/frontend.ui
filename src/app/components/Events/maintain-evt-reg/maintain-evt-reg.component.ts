import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-maintain-evt-reg',
  templateUrl: './maintain-evt-reg.component.html',
  styleUrls: ['./maintain-evt-reg.component.css']
})
export class MaintainEvtRegComponent implements OnInit {

  searchParm = "";
  tempSearchParm = "";

  urList: any[] = []

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {this.route.paramMap.subscribe({
    next: (parms) => {
      const searchParm = parms.get('searchParm')

      if (searchParm) {
        this.tempSearchParm = searchParm;
        this.searchParm = searchParm;
        this.search();
      }
    }
  })
  }

  search() {
    this.tempSearchParm = this.searchParm;
    this.eventsService.searchUserRegistration(this.searchParm).subscribe({
      next: (response) => {
        this.urList = response.urList;
      }
    })
  }

  updatePayment(evt_id: string, ref_code: string) {
    const req = {
      id: evt_id,
      ref_code: ref_code,
      searchParm: this.tempSearchParm
    }
    this.eventsService.updatePayment(req).subscribe({
      next: (response) => {
        this.urList = response.urList;
      }
    })
  }
}
