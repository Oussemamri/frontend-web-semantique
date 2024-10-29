import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../resource.service';

export interface Resource {
  resourceId: string;
  resourceName: string;
  resourceQuantity: number;
  resourceAvailabilityStatus: string;
  resourceType: string;
}

@Component({
  selector: 'app-update-resource',
  templateUrl: './update-resource.component.html',
  styleUrls: ['./update-resource.component.scss']
})
export class UpdateResourceComponent implements OnInit {
  resourceId: string;
  resource: Resource | undefined;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private router: Router
  ) {
    // Récupérer l'ID de la ressource à partir des paramètres de l'URL
    this.resourceId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    // Vérifier si l'ID de la ressource est fourni
    if (this.resourceId) {
      this.loadResource();
    } else {
      console.error("Aucun ID de ressource fourni dans l'URL");
      this.router.navigate(['/resources']);
    }
  }

  loadResource(): void {
    this.resourceService.getResources().subscribe(
      (resources: Resource[]) => {
        console.log('Ressources récupérées:', resources); // Vérifiez les données récupérées
        this.resource = resources.find(r => r.resourceId === this.resourceId);
        console.log('Ressource trouvée:', this.resource); // Vérifiez si la ressource est trouvée

        if (!this.resource) {
          console.error('Ressource non trouvée');
          this.router.navigate(['/resources']);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des ressources:', error);
        this.router.navigate(['/resources']);
      }
    );
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    this.updateResource();
  }

  updateResource(): void {
    if (this.resource) {
      this.resourceService.updateResource(this.resourceId, this.resource).subscribe({
        next: () => {
          console.log('Ressource mise à jour avec succès');
          this.router.navigate(['/resources']); // Redirection immédiate après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la ressource:', error);
        }
      });
    } else {
      console.error("La ressource à mettre à jour n'est pas définie.");
      this.router.navigate(['/resources']); // Redirection si la ressource est indéfinie
    }
  }
}
