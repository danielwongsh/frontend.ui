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

  urList: any[] = []

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.eventsService.searchUserRegistration(this.searchParm).subscribe({
      next: (response) => {
        this.urList = response.urList;
      }
    })
  }
}
