import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceReservationRoutingModule } from './resource-reservation-routing.module';
import { ResourcesComponent } from './resources/resources.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddResourceComponent } from './resources/add-resource/add-resource.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { UpdateReservationComponent } from './reservations/update-reservation/update-reservation.component';
import { UpdateResourceComponent } from './resources/update-resource/update-resource.component';


@NgModule({
  declarations: [
    ResourcesComponent,
    ReservationsComponent,
    AddResourceComponent,
    AddReservationComponent,
    UpdateReservationComponent,
    UpdateResourceComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    ReactiveFormsModule,

    ResourceReservationRoutingModule
  ]
})
export class ResourceReservationModule { }
