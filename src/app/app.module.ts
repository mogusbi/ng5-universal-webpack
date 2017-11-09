import {NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouting,
    BrowserModule.withServerTransition({
      appId: 'my-app'
    }),
    BrowserTransferStateModule
  ]
})
export class AppModule {}
