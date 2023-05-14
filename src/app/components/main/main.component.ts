import { Component, Input } from '@angular/core';
import { weatherService } from 'src/app/services/weather.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class main {
  Temp!: String;
  City!: String;
  faSpinner = faSpinner;
  spin: boolean = true;
  error: boolean = false;

  constructor(private service: weatherService) {
    
      navigator.geolocation.getCurrentPosition(position => {
        this.service.getLocation(position.coords.latitude, position.coords.longitude).subscribe(data => {
          this.Temp = String(data.main.temp).split(".")[0];
          this.City = data.name;
          this.spin = false;
          this.error = false;
        }, err => {
          this.error = true;
          this.spin = false;
        })
      });

  }

  handleWeather() {

    this.spin = true;
    this.service.getWeather(this.weatherForm.value.city!).subscribe(data => {
      this.Temp = String(data.main.temp).split(".")[0];
      this.City = data.name;
      this.spin = false;
      this.error = false;
    }, err => {
      this.error = true;
      this.spin = false;
    }
    )
  }

  weatherForm = new FormGroup({
    city: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])
  })

}
