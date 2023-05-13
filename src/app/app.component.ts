import { Component , Input} from '@angular/core';
import { weatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherApp-angular';
  temp!: String;
  city!: String;
  constructor(private service: weatherService) {}

  handleButton(city: String) {
    this.service.getWeather(city).subscribe(response => {
      this.temp = response.main.temp;
      this.city = response.name;
    });
  }
}
