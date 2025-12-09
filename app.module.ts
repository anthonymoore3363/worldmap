import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WorldMapComponent } from './components/world-map/world-map.component';
import { MapPageComponent } from './pages/map-page/map-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapComponent,
    MapPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
