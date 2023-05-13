import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class weatherService {

  constructor(private http:HttpClient) { }

  getWeather(city: String): Observable<any>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=387729f8d6de06a1c05a3ac870ffb50c`
    return this.http.get(url);
  }
}