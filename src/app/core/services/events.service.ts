// src/app/services/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Event } from '../models/event';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:9000/events'; // URL de votre API

  constructor(private http: HttpClient) {}

  // GET: Récupérer la liste des événements
  getEvents(): Observable<Event[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) =>
        response.results.bindings.map((binding: any) => ({
          event_id: binding.event_id.value,
          event_title: binding.event_title.value,
          event_description: binding.event_description.value,
          event_location: binding.event_location.value,
          event_time: binding.event_time.value,
          event_date: binding.event_date.value
        }))
      )
    );
  }

  // POST: Créer un nouvel événement
  createEvent(event: Event): Observable<any> {
    return this.http.post(this.apiUrl, event, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // PUT: Mettre à jour un événement existant
  updateEvent(event: Event): Observable<any> {
    return this.http.put(`${this.apiUrl}/${event.event_id}`, event, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // DELETE: Supprimer un événement
  deleteEvent(event_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${event_id}`);
  }
}
