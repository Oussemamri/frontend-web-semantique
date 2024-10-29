import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DefaultComponent } from './dashboards/default/default.component';
import { GardensListComponent } from './gardens/list/gardens-list/gardens-list.component';
import { PlantsListComponent } from './plants/list/plants-list/plants-list.component';
import { PlantsAddComponent } from './plants/add/plants-add/plants-add.component';
import { PlantsEditComponent } from './plants/edit/plants-edit/plants-edit.component';
import { GardensAddComponent } from './gardens/add/gardens-add/gardens-add.component';
import { GardensEditComponent } from './gardens/edit/gardens-edit/gardens-edit.component';
import { ExpertlistComponent } from './Expert/expertlist/expertlist.component';
import { TutoriallistComponent } from './Tutorial/tutoriallist/tutoriallist.component';
import { AddTutorialComponent } from './Tutorial/add-tutorial/add-tutorial.component';
import { AddExpertComponent } from './Expert/add-expert/add-expert.component';
import { ListEventsComponent } from './events/list-events/list-events.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { UpdateEventComponent } from './events/update-event/update-event.component';
import { ListSponsorsComponent } from './sponsors/list-sponsors/list-sponsors.component';
import { AddSponsorComponent } from './sponsors/add-sponsor/add-sponsor.component';
import { UpdateSponsorComponent } from './sponsors/update-sponsor/update-sponsor.component';
import { ResourcesComponent } from './resource-reservation/resources/resources.component';


const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  { path: "", component: DefaultComponent },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'gardens', component: GardensListComponent },
  { path: 'gardens/add', component: GardensAddComponent },
  { path: 'gardens/edit/:id', component: GardensEditComponent },
  { path: 'plants', component: PlantsListComponent },
  { path: 'plants/add', component: PlantsAddComponent },
  { path: 'plants/edit/:id', component: PlantsEditComponent },
  
  { path: 'listExpert', component: ExpertlistComponent },
  { path: 'listTutorial', component: TutoriallistComponent },
  { path: 'addTutorial', component: AddTutorialComponent },
  { path: 'addExpert', component: AddExpertComponent },
  {
    path: 'resource-reservation',
    loadChildren: () => import('./resource-reservation/resource-reservation.module').then(m => m.ResourceReservationModule)
  },

  {
    path: 'posts-comments',
    loadChildren: () => import('./posts-comments/posts-comments.module').then(m => m.PostsCommentsModule)
  },

  { path: 'events', component: ListEventsComponent},
  { path: 'events/add', component: AddEventComponent},
  { path: 'events/update/:id', component: UpdateEventComponent },
  { path: 'sponsors', component: ListSponsorsComponent},
  { path: 'sponsors/add', component: AddSponsorComponent},
  { path: 'sponsors/update/:id', component: UpdateSponsorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    
  ]
})
export class PagesRoutingModule { }
