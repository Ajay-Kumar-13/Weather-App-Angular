import { Component, Input } from '@angular/core';
import { weatherService } from 'src/app/services/weather.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class main {

  City:String ="";
  Temp!:String;
  C!:String;
  faSpinner = faSpinner;
  spin:boolean = true;
  error: boolean = false;

  constructor(private service: weatherService){

  }

  handleWeather() {
    this.spin = true;
    this.service.getWeather(this.City).subscribe(data => {
      this.Temp = String(data.main.temp).split(".")[0];
      this.C = data.name;
      this.spin=false;
      this.error=false;
    }, err => {
      this.error = true;
      this.spin= false;
    }
    )
  }

  weatherForm = new FormGroup({
    city: new FormControl("", [Validators.required,  Validators.pattern('^[a-zA-Z \-\']+')])
  })
  
}
