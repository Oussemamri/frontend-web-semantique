import { Component } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { Event } from 'src/app/core/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {
  newEvent: Event = {
    event_title: '',
    event_description: '',
    event_date: '',
    event_location: '',
    event_time: '',
    event_id: this.generateRandomId(), // Generate random ID on initialization
  };

  constructor(private eventService: EventsService, private router: Router) {}

  addEvent(): void {
    this.eventService.createEvent(this.newEvent).subscribe({
      next: (event) => {
        console.log(`Événement ajouté: ${event.event_title}`); // Ensure property name matches your Event model
        
        this.resetForm();
        this.router.navigate(['/events']); // Redirection ici
      },
      error: (err) => console.error('Échec de l\'ajout de l\'événement', err)
    });
  }

  resetForm(): void {
    this.newEvent = {
      event_title: '',
      event_description: '',
      event_date: '',
      event_location: '',
      event_time: '',
      event_id: this.generateRandomId(), // Regenerate random ID for the new event
    };
  }

  generateRandomId(): string {
    return Math.floor(100 + Math.random() * 900).toString(); // Generates a random ID between 100 and 999
  }
}
