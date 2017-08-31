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
  dataset = this.wildfires;

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

    var overlay = new google.maps.OverlayView();
    overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "wildfires");

        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        overlay.draw = function() {
          var projection = this.getProjection(),
              padding = 10;

          var marker = layer.selectAll("svg")
              .data(d3.entries(this.dataset))
              .each(transform) // update existing markers
              .enter().append("svg")
              .each(transform)
              .attr("class", "marker");

          // Add a circle.
          marker.append("circle")
              .attr("r", 4.5)
              .attr("cx", padding)
              .attr("cy", padding);

          // Add a label.
          marker.append("text")
              .attr("x", padding + 7)
              .attr("y", padding)
              .attr("dy", ".31em")
              .text(function(d) { return d.key; });

          function transform(d) {
            d = new google.maps.LatLng(oregon[1], oregon[0]);
            d = projection.fromLatLngToDivPixel(d);
            return d3.select(this)
                .style("left", (d.x - padding) + "px")
                .style("top", (d.y - padding) + "px");
          }
        };
      };

      // Bind our overlay to the map…
      overlay.setMap(map);

    // for(var i = 0; i < this.wildfires.length; i++) {
    //   var title = this.wildfires[i].title;
    //   var description = this.wildfires[i].description;
    //   var marker = new google.maps.Marker({
    //     position: {lat: this.wildfires[i].lat, lng: this.wildfires[i].lng},
    //     map: map,
    //     animation: google.maps.Animation.DROP,
    //     icon: image,
    //     title: title,
    //     description: description
    //   });
    //   marker.addListener('click', function() {
    //     var infowindow = new google.maps.InfoWindow({
    //       content: this.title + "<br>" + '<a href=' + this.description + '>' + this.description + '</a>'
    //     });
    //     infowindow.open(map, this);
    //   });
    // }
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
