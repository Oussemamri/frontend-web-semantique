import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './reservations/reservations.component';
import { ResourcesComponent } from './resources/resources.component';
import { AddResourceComponent } from './resources/add-resource/add-resource.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { UpdateReservationComponent } from './reservations/update-reservation/update-reservation.component';
import { UpdateResourceComponent } from './resources/update-resource/update-resource.component';

const routes: Routes = [
  { path: 'reservations', component: ReservationsComponent },
  { path: 'resources', component: ResourcesComponent },
  {path : 'add-resource', component: AddResourceComponent},
  {path : 'add-reservation', component: AddReservationComponent},
  {path : 'update-reservation/:id', component: UpdateReservationComponent},
  {path : 'update-resource/:id', component: UpdateResourceComponent}




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceReservationRoutingModule { }
