import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expert } from '../models/expert';


@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private apiUrl = 'http://localhost:9000/experts'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  getExperts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addExpert(expert: any): Observable<any> {
    return this.http.post(this.apiUrl, expert);
  }

  updateExpert(expertId:string,expert: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${expertId}`, expert);
  }

  deleteExpert(expert_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${expert_id}`);
  }
}
