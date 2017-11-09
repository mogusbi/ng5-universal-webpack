import {NgModule} from '@angular/core';
import {LazyComponent} from './lazy.component';
import {LazyRouting} from './lazy.routing';

@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    LazyRouting
  ]
})
export class LazyModule {}
