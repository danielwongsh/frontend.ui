import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Events } from 'src/app/models/event.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { IService } from './iservice.service';
import { setupTestingRouter } from '@angular/router/testing';
import { UserRegistration } from '../models/userRegistration.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends IService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {
    super();
  }

  getAllEvents(): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.get<any>(this.baseApiUrl + '/api/events', { headers: headers })
  }

  deleteEvent(event: Events): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/events/deleteevent', event, { headers: headers })
  }

  addEvent(event: Events): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/events/addevent', event, { headers: headers })
  }

  getEvent(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.get<any>(this.baseApiUrl + '/api/events/getevent/' + id, { headers: headers })
  }

  registerEvent(userRegistration: UserRegistration): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/events/userregistrationevent', userRegistration, { headers: headers })
  }

  getUserRegistration(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.get<any>(this.baseApiUrl + '/api/events/getuserregistration/' + id, { headers: headers })
  }
}
