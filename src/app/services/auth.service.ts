import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { IService } from './iservice.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends IService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {
    super()
   }

  login(user: Users): Observable<any>{
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/auth/login', user, { headers: headers })
  }

  getMe(): Observable<any>{
    let headers = new HttpHeaders();
    headers = this.createAuthHeader(headers);
    return this.http.post<any>(this.baseApiUrl + '/api/auth/login', { headers: headers })
  }
}
