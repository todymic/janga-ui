import {Component, Input, OnInit} from '@angular/core';
import {GoogleMap, MapAdvancedMarker, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMap,
    MapAdvancedMarker,
    MapMarker
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral = {lat: 49.59715 , lng: 6.13706};
  zoom = 13;

  @Input()
  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {gmpDraggable: false};

  @Input()
  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnInit(): void {
    this.markerPositions = [{lat: 49.59715 , lng: 6.13706}];
  }

}
