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
    return this.http.get<any>(this.baseApiUrl + '/api/Events/GetEvents', { headers: headers, withCredentials: true })
  }

  deleteEvent(event: Events): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/Events/DeleteEvent', event, { headers: headers, withCredentials: true })
  }

  addEvent(event: Events): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/Events/AddEvent', event, { headers: headers, withCredentials: true })
  }

  searchUserRegistration(searchParm: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.get<any>(this.baseApiUrl + '/api/Events/SearchUserRegistration/' + searchParm, { headers: headers, withCredentials: true })
  }

  updatePayment(req: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/Events/UpdatePayment', req, { headers: headers, withCredentials: true })
  }

  getEventResult(req: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/Events/GetEventResult', req, { headers: headers, withCredentials: true })
  }

  submitEventResult(req: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/Events/SubmitEventResult', req, { headers: headers, withCredentials: true })
  }

  editEventResult(req: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/Events/EditEventResult', req, { headers: headers, withCredentials: true })
  }

  updateEventResult(req: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/Events/UpdateEventResult', req, { headers: headers, withCredentials: true })
  }
}
