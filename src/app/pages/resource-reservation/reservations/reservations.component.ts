import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from './reservation.service';

interface Reservation {
  reservationId?: string;
  reservationDateDebut: string; 
  reservationDateFin: string; 
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = []; 

  constructor(
    private reservationService: ReservationService,
    private router: Router // Ajouter le routeur
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservations().subscribe(
      (data: any) => {
        if (data?.results?.bindings) {
          this.reservations = data.results.bindings.map(binding => ({
            reservationId: binding.reservation_id?.value || '', 
            reservationDateDebut: binding.reservation_date_debut?.value || '', 
            reservationDateFin: binding.reservation_date_fin?.value || ''
          }));
        } else {
          console.error('Aucun résultat trouvé');
          this.reservations = [];
        }
      },
      (error) => console.error('Erreur lors de la récupération des réservations:', error)
    );
  }

  goToUpdateReservation(reservationId: string): void {
    this.router.navigate(['/update-reservation', reservationId]); // Navigation vers le formulaire de mise à jour
  }
  
  deleteReservation(reservationId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.reservationService.deleteReservation(reservationId).subscribe(
        () => {
          this.getReservations();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la réservation:', error);
          alert(`Erreur: ${error.status} - ${error.message}`);
        }
      );
    }
  }
}
