import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IService } from './iservice.service';
import { UserRegistration } from '../models/userRegistration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends IService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {
    super();
  }

  getEvent(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.get<any>(this.baseApiUrl + '/api/UserRegistration/getevent/' + id, { headers: headers, withCredentials: true })
  }

  registerEvent(userRegistration: UserRegistration): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/UserRegistration/userregistrationevent', userRegistration, { headers: headers, withCredentials: true })
  }

  getUserRegistration(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.get<any>(this.baseApiUrl + '/api/UserRegistration/getuserregistration/' + id, { headers: headers, withCredentials: true })
  }
}
