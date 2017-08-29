import { Component, OnInit } from '@angular/core';
import { WildfireApiService } from '../wildfire-api.service'
import { Wildfire } from '../wildfire.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [WildfireApiService]
})
export class MapComponent implements OnInit {
  lat: number = 45.512794;
  lng: number = -122.679565;
  zoom: number = 5;
  wildfires: Wildfire[] = [];

  constructor(private wildfireData: WildfireApiService) { }


  getWildfireData() {
    this.wildfireData.getWildfireData().subscribe(response => {
      var call = response.json();
      for(var i = 0; i < call.events.length; i++) {
        var title = call.events[i].title;
        var description = call.events[i].sources[0].url;
        var lng = call.events[i].geometries[0].coordinates[0];
        var lat = call.events[i].geometries[0].coordinates[1];
        var newWildfire = new Wildfire(title, description, lat, lng);
        this.wildfires.push(newWildfire)
      }

    })
  }

  ngOnInit() {
      this.getWildfireData();
      console.log(this.wildfires);
  }
}

interface marker {
  title?:string;
  description: string;
  lat: number;
  lng: number;
}
