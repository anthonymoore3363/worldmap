import { Component } from '@angular/core';
import { CountryInfo } from '../../types/country-info';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {
  selected?: CountryInfo;
  onCountrySelected(info: CountryInfo) { this.selected = info; }
}
