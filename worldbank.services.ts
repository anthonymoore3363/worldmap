import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CountryInfo } from '../types/country-info';

@Injectable({ providedIn: 'root' })
export class WorldBankService {
  constructor(private http: HttpClient) {}

  getCountryByIso2(iso2: string): Observable<CountryInfo> {
    const url = `https://api.worldbank.org/v2/country/${iso2}?format=json`;
    return this.http.get<any>(url).pipe(
      map(resp => {
        const row = Array.isArray(resp) && resp[1] && resp[1][0] ? resp[1][0] : {};
        return {
          iso2: row?.iso2Code ?? iso2,
          name: row?.name ?? 'Unknown',
          capital: row?.capitalCity ?? 'N/A',
          region: row?.region?.value ?? 'N/A',
          incomeLevel: row?.incomeLevel?.value ?? 'N/A',
          latitude: row?.latitude ? Number(row.latitude) : 0,
          longitude: row?.longitude ? Number(row.longitude) : 0
        } as CountryInfo;
      })
    );
  }
}
