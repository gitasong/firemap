import { Component, OnInit } from '@angular/core';
import { WildfireApiService } from '../wildfire-api.service'
import { Wildfire } from '../wildfire.model';
import { MapsAPILoader } from 'angular2-google-maps/core';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [WildfireApiService]
})

export class MapComponent implements OnInit {
  wildfires: Wildfire[] = [];

  constructor(private wildfireData: WildfireApiService) { }

  initMap() {
    var image = {
      url: "../assets/Fire_Emoji_grande.png",
    }
    var oregon = {lat: 43.8136, lng: -120.6027};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: oregon,
      mapTypeId: 'terrain'
    });
    for(var i = 0; i < this.wildfires.length; i++) {
      var marker = new google.maps.Marker({
        position: {lat: this.wildfires[i].lat, lng: this.wildfires[i].lng},
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image
      });
      var title = this.wildfires[i].title;
      var description = this.wildfires[i].description;

      var infowindow = new google.maps.InfoWindow({
        content: title + "<br>" + description
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        console.log(marker);
      });
    }
  }

  getWildfireData() {
    this.wildfireData.getWildfireData().subscribe(response => {
      var call = response.json();
      console.log(call);
      for(var i = 0; i < call.events.length; i++) {
        var title = call.events[i].title;
        var description = call.events[i].sources[0].url;
        var lng = call.events[i].geometries[0].coordinates[0];
        var lat = call.events[i].geometries[0].coordinates[1];
        var newWildfire = new Wildfire(title, description, lat, lng);
        this.wildfires.push(newWildfire)
      }
      this.initMap()
    })
  }

  ngOnInit() {
    this.getWildfireData()
  }
}

interface marker {
  title?:string;
  description: string;
  lat: number;
  lng: number;
}
