import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router
import { ReservationService } from '../reservation.service';

interface Reservation {
  reservationId?: string; // Laissez ce champ optionnel si généré par l'API
  reservationDateDebut: string; 
  reservationDateFin: string; 
}

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {
  newReservation: Reservation = { 
    reservationId: '', 
    reservationDateDebut: '', 
    reservationDateFin: '' 
  };
  
  @Output() reservationAdded = new EventEmitter<void>();

  constructor(private reservationService: ReservationService, private router: Router) {} // Injecter Router

  createReservation(): void {
    this.reservationService.createReservation(this.newReservation).subscribe(
      () => {
        this.reservationAdded.emit(); // Émet un événement pour signaler l'ajout
        this.router.navigate(['/reservations']); // Redirection vers la liste des réservations
        this.resetNewReservation(); // Réinitialiser après création
      },
      (error) => console.error('Erreur lors de la création de la réservation:', error)
    );
  }

  resetNewReservation(): void {
    this.newReservation = { 
      reservationId: '', 
      reservationDateDebut: '', 
      reservationDateFin: '' 
    };
  }
}
