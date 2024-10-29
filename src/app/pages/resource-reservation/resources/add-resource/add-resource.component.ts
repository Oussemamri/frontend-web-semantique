import { Component } from '@angular/core';
import { ResourceService } from '../resource.service'; 
import { Router } from '@angular/router';

interface Resource {
  resourceId: string;
  resourceName: string;
  resourceQuantity: number; // Modifier pour un type numérique
  resourceAvailabilityStatus: string; // Champ requis
  resourceType: string;
}

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss'] // Ajoutez le fichier CSS si nécessaire
})
export class AddResourceComponent {
  newResource: Resource = {
    resourceName: '',
    resourceQuantity: 0, // Changer à 0 par défaut
    resourceType: '',
    resourceId: this.generateRandomId(), // Générer un ID aléatoire à l'initialisation
    resourceAvailabilityStatus: 'Available' // Valeur par défaut
  };

  constructor(private resourceService: ResourceService, private router: Router) {}

  createResource(): void {
    this.resourceService.createResource(this.newResource).subscribe({
      next: (resource) => {
        console.log(`Ressource ajoutée: ${resource.resourceName}`); // Assurez-vous que le nom de la propriété correspond à votre modèle de ressource
        
        this.resetForm(); // Réinitialiser le formulaire
        this.router.navigate(['/resources']); // Redirection ici
      },
      error: (err) => console.error('Échec de l\'ajout de la ressource', err)
    });
  }

  resetForm(): void {
    this.newResource = {
      resourceName: '',
      resourceQuantity: 0, // Changer à 0 par défaut
      resourceType: '',
      resourceId: this.generateRandomId(), // Régénérer un ID aléatoire pour la nouvelle ressource
      resourceAvailabilityStatus: 'Available' // Réinitialisation avec une valeur par défaut
    };
  }

  generateRandomId(): string {
    return Math.floor(100 + Math.random() * 900).toString(); // Génère un ID aléatoire entre 100 et 999
  }
}
