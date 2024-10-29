import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';

import { FilterPipe } from '../filter.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GardensListComponent } from './gardens/list/gardens-list/gardens-list.component';
import { PlantsListComponent } from './plants/list/plants-list/plants-list.component';
import { PlantsAddComponent } from './plants/add/plants-add/plants-add.component';
import { PlantsEditComponent } from './plants/edit/plants-edit/plants-edit.component';
import { GardensAddComponent } from './gardens/add/gardens-add/gardens-add.component';
import { GardensEditComponent } from './gardens/edit/gardens-edit/gardens-edit.component';
import { TutoriallistComponent } from './Tutorial/tutoriallist/tutoriallist.component';
import { ExpertlistComponent } from './Expert/expertlist/expertlist.component';
import { AddExpertComponent } from './Expert/add-expert/add-expert.component';
import { AddTutorialComponent } from './Tutorial/add-tutorial/add-tutorial.component';
import { ListSponsorsComponent } from './sponsors/list-sponsors/list-sponsors.component';
import { ListEventsComponent } from './events/list-events/list-events.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { UpdateEventComponent } from './events/update-event/update-event.component';
import { AddSponsorComponent } from './sponsors/add-sponsor/add-sponsor.component';
import { UpdateSponsorComponent } from './sponsors/update-sponsor/update-sponsor.component';
import { PostsCommentsModule } from './posts-comments/posts-comments.module';
import { ResourceReservationModule } from './resource-reservation/resource-reservation.module';




@NgModule({
  declarations: [ 
    GardensListComponent, PlantsListComponent, PlantsAddComponent, PlantsEditComponent, GardensAddComponent, GardensEditComponent,FilterPipe,
    TutoriallistComponent, ExpertlistComponent, AddExpertComponent, AddTutorialComponent,
    ListSponsorsComponent, ListEventsComponent, AddEventComponent, UpdateEventComponent, AddSponsorComponent, UpdateSponsorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,
    PostsCommentsModule,
    
    ResourceReservationModule
  ],
})
export class PagesModule { }
