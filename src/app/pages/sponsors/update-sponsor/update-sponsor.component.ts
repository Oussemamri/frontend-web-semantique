import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sponsor } from 'src/app/core/models/sponsor'; 

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SponsorService } from 'src/app/core/services/sponsor.service';

@Component({
  selector: 'app-update-sponsor', 
  templateUrl: './update-sponsor.component.html', 
  styleUrls: ['./update-sponsor.component.scss']
})
export class UpdateSponsorComponent implements OnInit {
  sponsorId: string;
  sponsorForm!: FormGroup;
  foundSponsor!: Sponsor; 

  constructor(
    private sponsorsService: SponsorService, 
    private route: ActivatedRoute,
    private fb: FormBuilder ,
    private router : Router
  ) {
    // Initialisez le formulaire avec les contrôles
    this.sponsorForm = this.fb.group({
      sponsor_name: ['', Validators.required],
      sponsor_type: ['', Validators.required],
      sponsor_contact_info: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sponsorId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Fetched sponsor ID:', this.sponsorId);

    if (this.sponsorId) {
      this.sponsorsService.getAllSponsors().subscribe(sponsors => {
        console.log('Fetched sponsors:', sponsors);

        // Recherchez le sponsor en utilisant l'identifiant
        const sponsor = sponsors.find(s => s.sponsor_id === this.sponsorId);
        
        if (!sponsor) {
          console.error(`Sponsor not found for ID: ${this.sponsorId}`);
          return;
        }

        // Si le sponsor est trouvé, remplissez le formulaire avec ses données
        this.foundSponsor = sponsor;
        this.sponsorForm.setValue({
          sponsor_name: this.foundSponsor.sponsor_name,
          sponsor_type: this.foundSponsor.sponsor_type,
          sponsor_contact_info: this.foundSponsor.sponsor_contact_info,
        });
        console.log('Form patched with sponsor data:', this.sponsorForm.value);
      }, error => {
        console.error('Error fetching sponsors:', error);
      });
    }
  }

  updateSponsor(): void {
    if (this.sponsorForm.valid) {
      const updatedSponsor: Sponsor = {
        sponsor_id: this.sponsorId, // Assurez-vous que l'identifiant du sponsor est correct
        ...this.sponsorForm.value
      };

      // Appelez le service pour mettre à jour le sponsor
      this.sponsorsService.updateSponsor(updatedSponsor).subscribe({
        next: (response) => {
          console.log('Sponsor updated successfully!', response);
          // Ici, vous pouvez rediriger ou afficher un message de succès
          this.router.navigate(['/sponsors']); 
        },
        error: (err) => {
          console.error('Error updating sponsor:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
