import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './common/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appFeature } from './store/app.reducer';
import { AppEffect } from './store/app.effects';
import { AppService } from './store/app.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot([]),
    StoreModule.forFeature(appFeature),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AppEffect]),
    HttpClientModule,
    NoopAnimationsModule,
    AuthModule,
    StoreDevtoolsModule.instrument(),
  ],
  providers: [AppService],
})
export class AppModule {}
