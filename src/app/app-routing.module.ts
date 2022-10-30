import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { AddEventsComponent } from './components/Events/add-events/add-events.component';
import { EditRegistrationComponent } from './components/Events/edit-registration/edit-registration.component';
import { EventRegistrationComponent } from './components/Events/event-registration/event-registration.component';
import { MaintainEventsComponent } from './components/Events/maintain-events/maintain-events.component';
import { MaintainEvtRegComponent } from './components/Events/maintain-evt-reg/maintain-evt-reg.component';
import { PostEventRegistrationComponent } from './components/Events/post-event-registration/post-event-registration.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
  },
  {
    path: 'maintain-event-registration/:searchParm',
    component: MaintainEvtRegComponent
  },
  {
    path: 'edit-registration/:id',
    component: EditRegistrationComponent
  },
  {
    path: 'edit-registration/:id/:searchParm',
    component: EditRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
