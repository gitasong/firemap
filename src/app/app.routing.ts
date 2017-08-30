import { HomePageComponent } from './home-page/home-page.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';

const appRoutes: Routes = [

  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'galleries/:id',
    component: GalleryDetailComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
