import {Component, OnInit} from '@angular/core';
import {
  BuildingService,
  IBuildingsJSON,
  IBuildingOccupationJSON,
} from './building.service';

export interface IBuilding {
  name: string;
  size: number;
  usage: string;
  capacity: number;
}

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'size', 'usage', 'capacity'];
  dataSource: IBuilding[] = [];

  constructor(private buildingsService: BuildingService) {}

  ngOnInit() {
    const tableData = {
      names: [],
      size: [],
      usage: [],
      capacity: [],
    };
    this.buildingsService.getBuildings().subscribe((buildingsData: IBuildingsJSON) => {
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
      this.dataSource.push({
        name: tableData.names[i],
        size: tableData.size[i],
        usage: tableData.usage[i],
        capacity: tableData.capacity[i],
      });
    }
    this.dataSource = [...this.dataSource];
  }
}


