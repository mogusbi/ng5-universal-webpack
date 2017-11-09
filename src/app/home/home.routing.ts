import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';

export const HomeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    component: HomeComponent,
    path: ''
  }
]);
