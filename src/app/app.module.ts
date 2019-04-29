import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BuildingListComponent } from './building-list/building-list.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule, MatPaginatorModule, MatTableModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    BuildingListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDC_IDJuLq2-ZACJU7WUl2BqpT_vuNJUsQ'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
