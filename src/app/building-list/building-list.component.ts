import {Component, OnInit, ViewChild} from '@angular/core';
import {
  BuildingService,
  IBuildingsJSON,
  IBuildingOccupationJSON,
} from './building.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

export interface IBuilding {
  name: string;
  size: number;
  usage: number;
  capacity: number;
}

export interface IMapData {
  address: string;
  size: number;
  usage: string;
  location: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'size', 'usage', 'capacity'];
  dataSource = new MatTableDataSource<IBuilding>([]);
  mapData: IMapData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private buildingsService: BuildingService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const tableData = {
      names: [],
      size: [],
      usage: [],
      capacity: [],
      location: {
        lat: [],
        lng: []
      },
      address: []
    };
    this.buildingsService.getBuildings().subscribe((buildingsData: IBuildingsJSON) => {
      tableData.address = buildingsData.buildings.map(building => building.address);
      tableData.location.lat = buildingsData.buildings.map(building => building.latitude);
      tableData.location.lng = buildingsData.buildings.map(building => building.longitude);
      tableData.names = buildingsData.buildings.map(building => building.code);
      this.buildingsService.getTotalDesk().subscribe((desksData: IBuildingOccupationJSON) => {
        tableData.size = desksData.stats
          .sort((statA, statB) => (statA.building.id - statB.building.id))
          .map(desks => desks.value);
        this.buildingsService.getDeskPeakOccupation().subscribe((occupationData: IBuildingOccupationJSON) => {
          const occupationValues = occupationData.stats
            .sort((statA, statB) => (statA.building.id - statB.building.id))
            .map(occupationStat => occupationStat.value);
          tableData.usage = occupationValues
            .map((value, index) =>
              `${Math.floor((value / tableData.size[index]) * 100)}`);
          tableData.capacity = occupationValues
            .map((value, index) =>
              tableData.size[index] - value);
        },     error => console.log(error), () => this.generateTable(tableData));
      });
    });
  }

  generateTable(tableData: any) {
    for (let i = 0; i < tableData.names.length; i++) {
      this.dataSource.data.push({
        name: tableData.names[i],
        size: tableData.size[i],
        usage: tableData.usage[i],
        capacity: tableData.capacity[i],
      });
      this.mapData.push({
        address: tableData.address[i],
        size: tableData.size[i],
        usage: tableData.usage[i],
        location: {
          lat: tableData.location.lat[i],
          lng: tableData.location.lng[i]
        }
      });
    }
    this.dataSource.data = [...this.dataSource.data];
    this.mapData = [...this.mapData];
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}


