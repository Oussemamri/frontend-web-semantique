import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.scss']
})
export class UpdateReservationComponent implements OnInit {
  reservationId: string;
  reservationForm: FormGroup;
  message: string | null = null; // Propriété pour le message

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      reservationDateDebut: ['', Validators.required],
      reservationDateFin: ['', [Validators.required, this.dateValidator.bind(this)]]
    });
  }

  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id') || '';
    this.loadReservation(this.reservationId);
  }

  loadReservation(id: string): void {
    this.reservationService.getReservationById(id).subscribe(reservation => {
      this.reservationForm.patchValue({
        reservationDateDebut: reservation.reservationDateDebut,
        reservationDateFin: reservation.reservationDateFin
      });
    });
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = this.reservationForm?.get('reservationDateDebut')?.value;
    const endDate = control.value;

    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      return { dateInvalid: true }; // Date de fin doit être postérieure à la date de début
    }
    return null; // Valid
  }

  updateReservation(): void {
    if (this.reservationForm.valid) {
      const updatedReservation = {
        reservationId: this.reservationId, // Assurez-vous que l'ID de réservation est correct
        ...this.reservationForm.value
      };

      this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe({
        next: () => {
          this.message = 'Réservation mise à jour avec succès !'; // Définir le message
          this.router.navigate(['/reservations']);
        },
        error: () => {
          this.message = 'Mise à jour effectuée, mais vérifiez les données !'; // Définir le message d'erreur
          this.router.navigate(['/reservations']);
        }
      });
    } else {
      console.error('Le formulaire est invalide');
      this.message = 'Le formulaire est invalide. Vérifiez les champs.'; // Définir le message d'erreur
    }
  }
}
