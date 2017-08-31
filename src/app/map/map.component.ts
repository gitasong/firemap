import { Component, OnInit } from '@angular/core';
import { WildfireApiService } from '../wildfire-api.service'
import { Wildfire } from '../wildfire.model';
import { MapsAPILoader } from 'angular2-google-maps/core';
import * as d3 from "d3";

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
    var map = new google.maps.Map(d3.select("#map").node(), {
      zoom: 5,
      center: oregon,
      mapTypeId: 'terrain'
    });

    for(var i = 0; i < this.wildfires.length; i++) {
      var title = this.wildfires[i].title;
      var description = this.wildfires[i].description;
      var marker = new google.maps.Marker({
        position: {lat: this.wildfires[i].lat, lng: this.wildfires[i].lng},
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image,
        title: title,
        description: description
      });
      marker.addListener('click', function() {
        var infowindow = new google.maps.InfoWindow({
          content: this.title + "<br>" + '<a href=' + this.description + '>' + this.description + '</a>'
        });
        infowindow.open(map, this);
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

// interface marker {
//   title?:string;
//   description: string;
//   lat: number;
//   lng: number;
// }
