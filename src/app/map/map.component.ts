import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IMapData} from '../building-list/building-list.component';

interface IMarker {
  lat: number;
  lng: number;
  icon: {
    url: string;
    scaledSize: {
      height: number;
      width: number;
    }
  };
  address: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() mapData: IMapData[];
  markers: IMarker[];
  zoom = 2;
  lat = 49.482706;
  lng = 57.810528;
  legends = ['green', 'ltblue', 'blue', 'yellow', 'orange', 'pink', 'purple', 'red'];
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: any) {
    if (changes.mapData.currentValue) {
      this.markers = this.mapData.map(data => ({
        lat: data.location.lat,
        lng: data.location.lng,
        icon: {
          url: `http://maps.google.com/mapfiles/ms/icons/${
              this.getUsageColor(data.usage)}-dot.png`,
          scaledSize: {
            height: this.getSize(data.size),
            width: this.getSize(data.size)
          },
        },
        address: data.address
      }));
    }
  }

  getUsageColor(percent) {
    switch (true) {
      case percent >= 0 && percent < 20: return 'green';
      case percent >= 20 && percent < 40: return 'ltblue';
      case percent >= 40 && percent < 50: return 'blue';
      case percent >= 50 && percent < 60: return 'yellow';
      case percent >= 60 && percent < 70: return 'orange';
      case percent >= 70 && percent < 80: return 'pink';
      case percent >= 80 && percent < 90: return 'purple';
      case percent >= 90 && percent < 100: return 'red';
    }
  }

  getSize(size) {
    switch (true) {
      case size >= 0 && size < 200: return 10;
      case size >= 200 && size < 400: return 15;
      case size >= 400 && size < 600: return 20;
      case size >= 600 && size < 800: return 25;
      case size >= 800 && size < 1000: return 30;
      case size >= 1000 && size < 1200: return 35;
      case size >= 1200 && size < 1400: return 40;
      case size >= 1400 && size < 1600: return 45;
      case size >= 1600 && size < 2000: return 50;
      case size > 2000: return 55;
    }
  }
}
