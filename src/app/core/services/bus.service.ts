import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bus } from '../models/bus.models';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:9000/buses'; // URL of the buses API

  constructor(private http: HttpClient) {}

  // Method to get the list of buses
  getBuses(): Observable<any> {
    const buses= this.http.get<any>(`${this.apiUrl}`).pipe(
      map(response => response) // Adjust response handling based on API response structure
    );
    console.log(buses);
    return buses;
  }

  // Method to delete a specific bus by ID
  deleteBus(bus_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bus_id}`);
  }
  addBus(busData: any): Observable<any> {
    return this.http.post(this.apiUrl, busData);
  }
}
