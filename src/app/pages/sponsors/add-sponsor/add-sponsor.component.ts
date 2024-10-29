// src/app/add-sponsor/add-sponsor.component.ts
import { Component } from '@angular/core';

import { Sponsor } from 'src/app/core/models/sponsor';
import { Router } from '@angular/router';
import { SponsorService } from 'src/app/core/services/sponsor.service';

@Component({
  selector: 'app-add-sponsor',
  templateUrl: './add-sponsor.component.html',
  styleUrls: ['./add-sponsor.component.scss']
})
export class AddSponsorComponent {
  newSponsor: Sponsor = {
    sponsor_name: '',
    sponsor_type: '',
    sponsor_contact_info: '', // Changer selon les propriétés disponibles dans votre modèle
    sponsor_id: this.generateRandomId(), // Générer un ID aléatoire lors de l'initialisation
  };

  constructor(private sponsorsService: SponsorService, private router: Router) {}

  addSponsor(): void {
    this.sponsorsService.createSponsor(this.newSponsor).subscribe({
      next: (sponsor) => {
        console.log(`Sponsor ajouté: ${sponsor.sponsor_name}`); // Assurez-vous que le nom de la propriété correspond à votre modèle Sponsor
        
        this.resetForm();
        this.router.navigate(['/sponsors']); // Redirection ici
      },
      error: (err) => console.error('Échec de l\'ajout du sponsor', err)
    });
  }

  resetForm(): void {
    this.newSponsor = {
      sponsor_name: '',
      sponsor_type: '',
      sponsor_contact_info: '', // Changer selon les propriétés disponibles dans votre modèle
      sponsor_id: this.generateRandomId(), // Regénérer un ID aléatoire pour le nouveau sponsor
    };
  }

  generateRandomId(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Génère un ID aléatoire entre 1000 et 9999
  }
}
