import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

export const AppRouting: ModuleWithProviders = RouterModule.forRoot([
  {
    loadChildren: './home/home.module#HomeModule',
    path: '',
    pathMatch: 'full'
  },
  {
    loadChildren: './lazy/lazy.module#LazyModule',
    path: 'lazy',
    pathMatch: 'full'
  }
]);
