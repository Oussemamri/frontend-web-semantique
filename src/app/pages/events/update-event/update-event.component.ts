import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  eventId: string;
  eventForm!: FormGroup;
  foundEvent!: Event; // Use Event type

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private fb: FormBuilder 
  ) {
    // Initialize the form with controls
    this.eventForm = this.fb.group({
      event_title: ['', Validators.required],
      event_description: ['', Validators.required],
      event_location: ['', Validators.required],
      event_time: ['', Validators.required],
      event_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Fetched event ID:', this.eventId);

    if (this.eventId) {
      this.eventsService.getEvents().subscribe(events => {
        console.log('Fetched events:', events);

        // Search for the event using the eventId
        const event = events.find(e => e.event_id === this.eventId);
        
        if (!event) {
          console.error(`Event not found for ID: ${this.eventId}`);
          return;
        }

        // If the event is found, patch the form with its data
        this.foundEvent = event;
        this.eventForm.setValue({
          event_title: this.foundEvent.event_title,
          event_description: this.foundEvent.event_description,
          event_location: this.foundEvent.event_location,
          event_time: this.foundEvent.event_time,
          event_date: this.foundEvent.event_date,
        });
        console.log('Form patched with event data:', this.eventForm.value);
      }, error => {
        console.error('Error fetching events:', error);
      });
    }
  }

  updateEvent(): void {
    if (this.eventForm.valid) {
      const updatedEvent: Event = {
        event_id: this.eventId, // Ensure the event ID is correct
        ...this.eventForm.value
      };

      // Call the service to update the event
      this.eventsService.updateEvent(updatedEvent).subscribe({
        next: (response) => {
          console.log('Event updated successfully!', response);
          // Here you can redirect or display a success message
        },
        error: (err) => {
          console.error('Error updating event:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
