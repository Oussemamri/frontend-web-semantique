// src/app/list-events/list-events.component.ts
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events.service';


@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => (this.events = data),
      error: (err) => console.error('Failed to load events', err)
    });
  }
  deleteEvent(eventId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.events = this.events.filter(event => event.event_id !== eventId);
          this.ngOnInit;
          console.log(`L'événement avec l'ID ${eventId} a été supprimé avec succès.`);
        },
        error: (err) => console.error('Échec de la suppression de l\'événement', err)
      });
    }
  }
  
}
