import { Component, OnInit } from '@angular/core';
import { ResourceService } from './resource.service';

interface Resource {
  resourceId: string;
  resourceName: string;
  resourceQuantity: number; // Assurez-vous que ce soit un type numérique
  resourceAvailabilityStatus: string; // Champ requis
  resourceType: string;
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  newResource: Resource = { 
    resourceId: '', 
    resourceName: '', 
    resourceQuantity: 0, // Valeur par défaut
    resourceAvailabilityStatus: 'Available', // Valeur par défaut
    resourceType: '' 
  };

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.getResources(); // Récupérer les ressources au démarrage du composant
  }

  getResources(): void {
    this.resourceService.getResources().subscribe(
      (data: any) => {
        if (data?.results?.bindings) {
          this.resources = data.results.bindings.map(binding => ({
            resourceId: binding.resource_id?.value || '',
            resourceName: binding.resource_name?.value || '',
            resourceQuantity: parseInt(binding.resource_quantity?.value) || 0,
            resourceAvailabilityStatus: binding.resource_availability_status?.value || 'Available',
            resourceType: binding.resource_type?.value || ''
          }));
        } else {
          console.error('Aucun résultat trouvé');
          this.resources = [];
        }
      },
      (error) => console.error('Erreur lors de la récupération des ressources:', error)
    );
  }

  addResource(): void {
    this.resourceService.createResource(this.newResource).subscribe(
      (response) => {
        this.resources.push(response); // Ajoute la nouvelle ressource à la liste
        this.resetNewResource(); // Réinitialiser le formulaire
      },
      (error) => this.handleError('Erreur lors de la création de la ressource', error)
    );
  }

  updateResource(resource: Resource): void {
    this.resourceService.updateResource(resource.resourceId, resource).subscribe(
      () => {
        console.log('Ressource mise à jour avec succès');
      },
      (error) => this.handleError('Erreur lors de la mise à jour de la ressource', error)
    );
  }

  deleteResource(resourceId: string): void {
    this.resourceService.deleteResource(resourceId).subscribe(
      (response) => {
        if (response) { // Vérifiez que la réponse est correcte
          // Filtrer la ressource supprimée de la liste locale
          this.resources = this.resources.filter(r => r.resourceId !== resourceId);
          console.log('Ressource supprimée avec succès');
        } else {
          console.error('Erreur lors de la suppression de la ressource : aucune réponse reçue');
        }
      },
      (error) => this.handleError('Erreur lors de la suppression de la ressource', error)
    );
  }
  

  // Méthode pour gérer les erreurs
  private handleError(message: string, error: any): void {
    console.error(message, error);
  }

  // Méthode pour réinitialiser les champs du formulaire
  private resetNewResource(): void {
    this.newResource = { 
      resourceId: '', 
      resourceName: '', 
      resourceQuantity: 0, 
      resourceAvailabilityStatus: 'Available', // Réinitialisation avec une valeur par défaut
      resourceType: '' 
    };
  }
}
