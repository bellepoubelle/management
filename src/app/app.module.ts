import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {  HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {
  AgmCoreModule
} from '@agm/core';
import { PoubelleComponent } from './poubelle/poubelle.component';
import { PoubelleService } from "./poubelle.service";
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from "./message.service";
import { AlerteComponent } from "./alerte/alerte.component";
import { AlerteService } from "./alerte.service";
import { AccountComponent } from './account/account.component';
import { AccountService } from './account.service';
import { BrowserModule } from "@angular/platform-browser";
import { AddresseComponent } from './addresse/addresse.component';
import { AdresseByIdComponent } from './adresse-by-id/adresse-by-id.component';
import { AddresseService } from "./addresse.service";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAd01ImymjHbaaiK0nuakK6qd4DKvRZJQw'
    }),


    HttpClientModule,
    BrowserModule

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    NotificationsComponent,
    PoubelleComponent,
    MessagesComponent,
    AlerteComponent,
    AccountComponent,
    AddresseComponent,
    AdresseByIdComponent,

  ],
  providers: [
    PoubelleService,
    MessageService,
    AlerteService,
    AccountService,
    AddresseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
