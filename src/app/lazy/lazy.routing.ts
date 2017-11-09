import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LazyComponent} from './lazy.component';

export const LazyRouting: ModuleWithProviders = RouterModule.forChild([
  {
    component: LazyComponent,
    path: ''
  }
]);
