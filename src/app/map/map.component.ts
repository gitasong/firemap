import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WildfireApiService } from '../wildfire-api.service'
import { Wildfire } from '../wildfire.model';
import { MapsAPILoader } from 'angular2-google-maps/core';
import * as d3 from 'd3';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [WildfireApiService]
})

export class MapComponent implements OnInit {
  wildfires: Wildfire[] = [];
  dataset = [];

  constructor(private wildfireData: WildfireApiService) { }

  initMap() {
    let wildfireData = this.dataset;
    console.log(this.dataset);
    // var image = {
    //   url: "../assets/Fire_Emoji_grande.png",
    // }
    var oregon = {lat: 43.8136, lng: -120.6027};
    var map = new google.maps.Map(d3.select("#map").node(), {
      zoom: 5,
      center: oregon,
      mapTypeId: 'terrain'
    });

    var overlay = new google.maps.OverlayView();
    overlay.onAdd = function() {
    // if (overlay) {
      console.log(overlay);
    // }
    var layer = d3.select(overlay.getPanes().overlayLayer).append("div")
        .attr("class", "fires");
          console.log(overlay.getPanes().overlayLayer);

        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        overlay.draw = function() {
          var projection = this.getProjection(),
              padding = 10;

          console.log(d3.entries(wildfireData)); // Not getting the dataset in

          var marker = layer.selectAll("svg")
              .data(d3.entries(wildfireData))
              .each(transform) // update existing markers
              .enter().append("svg")
              .each(transform)
              .attr("class", "fires");
          console.log(marker);

          // Add a circle.
          marker.append("circle")
              .attr("r", 7)
              .attr("cx", padding)
              .attr("cy", padding);

          // marker.append("rect")  // attempt to put the text in its own (popup) box, but Google Maps won't allow click and mouseover events (that functionality has been coopted by the dragger hand)
          //     .attr("x", padding + 10)
          //     .attr("y", padding)
              // .attr("width", 100)
              // .attr("height", 200)
              // .attr("background-color", "rgba(255, 255, 255, 0.5)");

          // Add a label.
          // marker.append("text")  // fire name
          //     .attr("x", padding + 7)
          //     .attr("y", padding)
          //     .attr("dy", ".31em")
          //     .attr("fill", "gray")
          //     .text(function(d) { return d.value[2]; });

          // marker.append("text")  // fire InciWeb link
          //     .attr("x", padding + 7)
          //     .attr("y", padding + 10)
          //     .attr("dy", ".31em")
          //     .attr("fill", "gray")
          //     .text(function(d) { return d.value[3]; });

          function transform(d) {
            d = new google.maps.LatLng(d.value[0], d.value[1]);
            d = projection.fromLatLngToDivPixel(d);
            return d3.select(this)
                .style("left", (d.x - padding) + "px")
                .style("top", (d.y - padding) + "px");
          }
        };
      };

      // Bind our overlay to the map…
      overlay.setMap(map);
  }

  getWildfireData() {
    this.wildfireData.getWildfireData().subscribe(response => {
      var call = response.json();
      // console.log(call);
      for(var i = 0; i < call.events.length; i++) {
        var title = call.events[i].title;
        var description = call.events[i].sources[0].url;
        var lng = call.events[i].geometries[0].coordinates[0];
        var lat = call.events[i].geometries[0].coordinates[1];
        var newWildfire = new Wildfire(title, description, lat, lng);
        this.wildfires.push(newWildfire)
      }
      for(var i = 0; i < this.wildfires.length; i++) {
        var fire: any[] = [this.wildfires[i].lat, this.wildfires[i].lng, this.wildfires[i].title, this.wildfires[i].description];
        this.dataset.push(fire)
      }
      // console.log(this.dataset);
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
