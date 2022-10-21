import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaintainEventsComponent } from './components/Events/maintain-events/maintain-events.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddEventsComponent } from './components/Events/add-events/add-events.component';
import { FormsModule } from '@angular/forms';
import { EventRegistrationComponent } from './components/Events/event-registration/event-registration.component';
import { TwoDigitDecimaNumberDirective } from './directives/common-directives';
import { PostEventRegistrationComponent } from './components/Events/post-event-registration/post-event-registration.component';
import { MaintainEvtRegComponent } from './components/Events/maintain-evt-reg/maintain-evt-reg.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    //TwoDigitDecimaNumberDirective,
    MaintainEventsComponent,
    AddEventsComponent,
    EventRegistrationComponent,
    PostEventRegistrationComponent,
    MaintainEvtRegComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
