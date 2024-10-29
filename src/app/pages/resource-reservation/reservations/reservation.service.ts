import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:9000/reservations'; // Modifier avec l'URL du serveur

  constructor(private http: HttpClient) {}

  // Get all reservations
  getReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}`); 
  }

  // Create a new reservation
  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, reservationData);
  }

  // Update an existing reservation
  updateReservation(reservationId: string, data: { reservationDateDebut: string; reservationDateFin: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reservationId}`, data);
}


  // Delete a reservation
// Delete a reservation
deleteReservation(reservationId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${reservationId}`).pipe(
    tap(response => console.log('Réponse de suppression:', response)), // Afficher la réponse
    catchError(this.handleError) // Gérer les erreurs si nécessaire
  );
}

private handleError(error: any): Observable<never> {
  console.error('Une erreur est survenue:', error);
  return throwError('Une erreur est survenue; veuillez réessayer plus tard.');
}
getReservationById(reservationId: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${reservationId}`);
}




}
