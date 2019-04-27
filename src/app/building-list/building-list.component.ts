import { Component, OnInit } from '@angular/core';
import {BuildingService, IBuildingsJSON, IBuildingsData} from './building.service';

export interface IBuilding {
  name: string;
  size: number;
  usage: number;
  capacity: number;
}

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  buildings: IBuildingsJSON;
  displayedColumns: string[] = ['Building', 'Size', 'Usage', 'Capacity'];
  dataSource: IBuilding[] = [];
  constructor(private buildingsService: BuildingService) { }

  ngOnInit() {
    this.buildingsService.getBuildings().subscribe((data: IBuildingsJSON) => {
      console.log(data.buildings);
      const buildingNames = data.buildings.map(building => building.code);
      console.log(buildingNames);
      this.buildings = data;


      for (let i = 0; i < data.buildings.length; i++) {
        this.dataSource.push({
            name: buildingNames[i],
            size: 2, // buildingSizes[i];
            usage: 3, // buildingUsages[i];
            capacity: 4, // buildingCapacity[i];
        });
      }
      console.log(this.dataSource);
    });
  }
}

