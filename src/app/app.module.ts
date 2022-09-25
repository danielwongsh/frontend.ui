import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaintainEventsComponent } from './components/Events/maintain-events/maintain-events.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEventsComponent } from './components/Events/add-events/add-events.component';
import { FormsModule } from '@angular/forms';
import { EventRegistrationComponent } from './components/Events/event-registration/event-registration.component';
import { TwoDigitDecimaNumberDirective } from './directives/common-directives';
import { PostEventRegistrationComponent } from './components/Events/post-event-registration/post-event-registration.component';
import { MaintainEvtRegComponent } from './components/Events/maintain-evt-reg/maintain-evt-reg.component';

@NgModule({
  declarations: [
    AppComponent,
    //TwoDigitDecimaNumberDirective,
    MaintainEventsComponent,
    AddEventsComponent,
    EventRegistrationComponent,
    PostEventRegistrationComponent,
    MaintainEvtRegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
