import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class IService {
  createAuthHeader(headers: HttpHeaders): HttpHeaders{
    headers = headers.append('XApiKey', 'pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    return headers;
  }
}
