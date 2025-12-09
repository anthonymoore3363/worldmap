import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPageComponent } from './pages/map-page/map-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'map' },
  { path: 'map', component: MapPageComponent },
  { path: '**', redirectTo: 'map' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
