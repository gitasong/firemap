import { HomePageComponent } from './home-page/home-page.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [

  {
    path: '',
    component: HomePageComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
