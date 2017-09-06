import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WildfireApiService {

  constructor(private http: Http) { }

  getWildfireData() {
    return this.http.get("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?limit=100&days=100&source=InciWeb&status=open&title=wildfires")
  }
}
