import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(public httpClient:HttpClient) {}

  opts = [];

getData() {
  return this.opts.length ?
    of(this.opts) :
    this.httpClient.get<any>('https://jsonplaceholder.typicode.com/users').pipe(tap(data => this.opts = data))
}
}
