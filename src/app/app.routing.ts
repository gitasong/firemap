import { HomePageComponent } from './home-page/home-page.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { SafetyComponent } from './safety/safety.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [

  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'galleries/:id',
    component: GalleryDetailComponent
  },
  {
    path: 'safety',
    component: SafetyComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
