import { Component } from '@angular/core';
import { Sponsor } from 'src/app/core/models/sponsor';
import { SponsorService } from 'src/app/core/services/sponsor.service';

@Component({
  selector: 'app-list-sponsors',
  templateUrl: './list-sponsors.component.html',
  styleUrls: ['./list-sponsors.component.scss']
})
export class ListSponsorsComponent {
  sponsors: Sponsor[] = [];

  constructor(private sponsorService: SponsorService) {}

  ngOnInit(): void {
    this.getSponsors();
  }

  getSponsors(): void {
    this.sponsorService.getAllSponsors().subscribe({
      next: (data) => (this.sponsors = data),
      error: (err) => console.error('Failed to load sponsors', err)
    });
  }

  deleteSponsor(sponsorId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sponsor ?')) {
      this.sponsorService.deleteSponsor(sponsorId).subscribe({
        next: () => {
          this.sponsors = this.sponsors.filter(sponsor => sponsor.sponsor_id !== sponsorId);
          console.log(`Le sponsor avec l'ID ${sponsorId} a été supprimé avec succès.`);
        },
        error: (err) => console.error('Échec de la suppression du sponsor', err)
      });
    }
  }
}
