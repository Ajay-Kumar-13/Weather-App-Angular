import { Component, OnInit, ViewChild } from '@angular/core';
import { weatherService } from 'src/app/services/weather.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pluck, map } from 'rxjs';
import { Chart } from 'chart.js';

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
  Temps: number[] = [];
  dates: number[] = [];

  constructor(private service: weatherService) {

    navigator.geolocation.watchPosition(function (position) {
      // console.log("tracking you!");

    }, error => {
      if (error.code == error.PERMISSION_DENIED) {
        this.handleWeather('visakhapatnam');
      }
    })

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

      this.service.get7daysWeather_LatLon(position.coords.latitude, position.coords.longitude).pipe(
        pluck('data'),
        pluck('weather'),
      ).subscribe(data => {

        for (let i = 0; i < data.length; i++) {
          this.Temps.push(parseInt(data[i].maxtempC));
          this.dates.push(data[i].date);
        }
        // this.weatherForm.reset();
        this.displayGraph();
        this.Temps = []
        this.dates = []
      })

    });

  }


  displayGraph() {
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        datasets: [{
          label: 'Temperature',
          data: this.Temps,
          backgroundColor: "rgb(115 185 243 / 65%)",
          borderColor: "#007ee7",
          fill: true,
        }],
        labels: this.dates
      },
    });
  }

  handleWeather(city: String) {

    this.spin = true;
    this.service.getWeather(city).subscribe(data => {
      this.Temp = String(data.main.temp).split(".")[0];
      this.City = data.name;
      this.spin = false;
      this.error = false;
    }, err => {
      this.error = true;
      this.spin = false;
    })

    this.service.get7daysWeather(city).pipe(
      pluck('data'),
      pluck('weather'),
    ).subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        this.Temps.push(parseInt(data[i].maxtempC));
        this.dates.push(data[i].date);
      }
      // this.weatherForm.reset();
      if (!this.error) {
        this.displayGraph();
      }
      this.Temps = []
      this.dates = []

    })

  }


  weatherForm = new FormGroup({
    city: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')])
  })

}
