import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../../models/garden/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'http://localhost:9000/plants';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPlantById(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(this.apiUrl, plant);
  }

  updatePlant(plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.apiUrl}/${plant.plant_id}`, plant);
  }

  deletePlant(plant_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${plant_id}`);
  }
}