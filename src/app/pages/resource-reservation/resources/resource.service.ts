import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Définir une interface pour les données de ressource
export interface Resource {
  resourceId: string;
  resourceName: string;
  resourceQuantity: number; // Supposons que la quantité est un nombre
  resourceAvailabilityStatus: string;
  resourceType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private baseUrl = 'http://localhost:9000/resources'; // Modifier avec l'URL du serveur

  constructor(private http: HttpClient) {}

  // Get all resources
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des ressources:', error);
        return throwError(error);
      })
    ); 
  }

  // Create a new resource
  createResource(resourceData: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.baseUrl}`, resourceData).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de la ressource:', error);
        return throwError(error);
      })
    );
  }
  
  // Update an existing resource
  updateResource(resourceId: string, resourceData: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.baseUrl}/${resourceId}`, resourceData).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de la ressource:', error);
        return throwError(error);
      })
    ); 
  }

  // Delete a resource
// ResourceService
deleteResource(resourceId: string): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/${resourceId}`).pipe(
    catchError((error) => {
      console.error('Erreur lors de la suppression de la ressource:', error);
      return throwError(error);
    })
  );
}
getResourceById(resourceId: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${resourceId}`);
}

}
