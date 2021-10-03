import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '@core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '@store/users';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UsersEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
