import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventsComponent } from './components/Events/add-events/add-events.component';
import { EventRegistrationComponent } from './components/Events/event-registration/event-registration.component';
import { MaintainEventsComponent } from './components/Events/maintain-events/maintain-events.component';
import { MaintainEvtRegComponent } from './components/Events/maintain-evt-reg/maintain-evt-reg.component';
import { PostEventRegistrationComponent } from './components/Events/post-event-registration/post-event-registration.component';

const routes: Routes = [
  {
    path: '',
    component: MaintainEventsComponent
  },
  {
    path: 'maintain-events',
    component: MaintainEventsComponent
  },
  {
    path: 'maintain-events/add',
    component: AddEventsComponent
  },
  {
    path: 'event-registration/:id',
    component: EventRegistrationComponent
  },
  {
    path: 'event-registration/post-event-registration/:id',
    component: PostEventRegistrationComponent
  },
  {
    path: 'maintain-event-registration',
    component: MaintainEvtRegComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
