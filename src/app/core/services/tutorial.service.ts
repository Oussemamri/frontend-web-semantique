import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private apiUrl = 'http://localhost:9000/tutorials'; // Remplacez par votre URL d'API
  private expertsApiUrl = 'http://localhost:9000/experts';

  constructor(private http: HttpClient) {}

  getTutorials(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getExperts(): Observable<any> {
    return this.http.get(this.expertsApiUrl);
  }

  addTutorial(tutorial: any): Observable<any> {
    return this.http.post(this.apiUrl, tutorial);
  }

  updateTutorial(tutorial: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tutorial.tutorial_id}`, tutorial);
  }

  deleteTutorial(tutorial_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tutorial_id}`);
  }
}
