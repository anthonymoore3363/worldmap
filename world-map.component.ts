import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { WorldBankService } from '../../services/worldbank.services';
import { CountryInfo } from '../../types/country-info';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit, OnDestroy {
  @Output() countrySelected = new EventEmitter<CountryInfo>();
  private svgSub?: Subscription;
  private currentHoverEl?: SVGElement;

  private idToIso2: Record<string, string> = {};

  constructor(
    private http: HttpClient,
    private host: ElementRef<HTMLElement>,
    private wb: WorldBankService
  ) {}

  ngOnInit(): void {
    this.svgSub = this.http.get('assets/map.svg', { responseType: 'text' })
      .subscribe(svgText => {
        const container = this.host.nativeElement.querySelector('#svgContainer')!;
        container.innerHTML = svgText;

        const paths = container.querySelectorAll<SVGElement>('path');
        paths.forEach(p => {
          p.style.cursor = 'pointer';
          p.addEventListener('mouseenter', this.onEnter);
          p.addEventListener('mouseleave', this.onLeave);
          p.addEventListener('click', this.onClick);
        });
      });
  }

  ngOnDestroy(): void {
    const container = this.host.nativeElement.querySelector('#svgContainer');
    if (container) {
      const paths = container.querySelectorAll<SVGElement>('path');
      paths.forEach(p => {
        p.removeEventListener('mouseenter', this.onEnter);
        p.removeEventListener('mouseleave', this.onLeave);
        p.removeEventListener('click', this.onClick);
      });
    }
    this.svgSub?.unsubscribe();
  }

  private onEnter = (ev: Event) => {
    const el = ev.currentTarget as SVGElement;
    this.currentHoverEl = el;
    el.setAttribute('data-prev-fill', el.getAttribute('fill') || '');
    el.setAttribute('fill', '#ffd54f');
  };

  private onLeave = (ev: Event) => {
    const el = ev.currentTarget as SVGElement;
    const prev = el.getAttribute('data-prev-fill');
    if (prev !== null) el.setAttribute('fill', prev);
    this.currentHoverEl = undefined;
  };

  private onClick = (ev: Event) => {
    const el = ev.currentTarget as SVGElement;
    let code = (el.getAttribute('data-iso2') || el.id || '').toUpperCase();
    if (code.length === 3 && this.idToIso2[code]) code = this.idToIso2[code];
    if (!code || code.length !== 2) {
      const title = el.querySelector('title')?.textContent?.trim() || '';
      if (title.length === 2) code = title.toUpperCase();
    }
    if (!code || code.length !== 2) return;

    this.wb.getCountryByIso2(code).subscribe({
      next: info => this.countrySelected.emit(info),
      error: err => console.error(err)
    });
  };
}
