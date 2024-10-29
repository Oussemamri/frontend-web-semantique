import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garden } from '../../models/garden/garden';

@Injectable({
  providedIn: 'root'
})
export class GardenService {
  private apiUrl = 'http://localhost:9000/gardens';

  constructor(private http: HttpClient) {}

  getGardens(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getGardenById(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addGarden(garden: Garden): Observable<Garden> {
    return this.http.post<Garden>(this.apiUrl, garden);
  }

  updateGarden(garden: Garden): Observable<Garden> {
    return this.http.put<Garden>(`${this.apiUrl}/${garden.garden_id}`, garden);
  }

  deleteGarden(garden_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${garden_id}`);
  }
}