import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 45.512794;
  lng: number = -122.679565;

  constructor() { }

  ngOnInit() {
  }

}
