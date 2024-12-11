import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage'
import { LoaderService } from './services/Loader.service';
import { CommonDataService } from './services/common-data.service';
import { AppEventService } from './services/app-event.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule,CommonModule, ReactiveFormsModule],
  providers: [Storage,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LoaderService, CommonDataService, AppEventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
