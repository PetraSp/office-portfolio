import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface IBuildingsData {
  address: string;
  code: string;
  id: number;
  latitude: number;
  longitude: number;
}

export interface IBuildingOccupiedDeskData {
  dateTime: string;
  value: number;
  building: {
    id: number
  };
}

export interface IBuildingsJSON {
  buildings: IBuildingsData[];
}

export interface IBuildingOccupationJSON {
  stats: IBuildingOccupiedDeskData[];
}


@Injectable({
  providedIn: 'root'
})


export class BuildingService {
  private buildingUrl = 'api/data/buildings.json';
  private totalDesksUrl = 'api/data/totalDesksPerBuilding.json';
  private peakOccupationUrl = 'api/data/peakOfOccupiedDesksPerBuilding.json';
  constructor(private http: HttpClient) {
  }

  getBuildings(): Observable<IBuildingsJSON | undefined> {
    return this.http.get<IBuildingsJSON>(this.buildingUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTotalDesk(): Observable<IBuildingOccupationJSON | undefined> {
    return this.http.get<IBuildingOccupationJSON>(this.totalDesksUrl).pipe(
      catchError(this.handleError)
    );
  }

  getDeskPeakOccupation(): Observable<IBuildingOccupationJSON | undefined> {
    return this.http.get<IBuildingOccupationJSON>(this.peakOccupationUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
