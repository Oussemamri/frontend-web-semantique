import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Sponsor } from '../models/sponsor';
// Assurez-vous que le chemin d'importation est correct

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  private apiUrl = 'http://localhost:9000/sponsors'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer tous les sponsors
  getAllSponsors(): Observable<Sponsor[]> {
  
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) =>
        response.results.bindings.map((binding: any) => ({
          sponsor_id: binding.sponsor_id.value,
          sponsor_name: binding.sponsor_name.value,
          sponsor_type: binding.sponsor_type.value,
          sponsor_contact_info: binding.sponsor_contact_info.value,
          
        }))
      )
    );
  }



  // Créer un nouveau sponsor
  createSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(this.apiUrl, sponsor, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Mettre à jour un sponsor existant
  updateSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.apiUrl}/${sponsor.sponsor_id}`, sponsor, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Supprimer un sponsor
  deleteSponsor(sponsorId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sponsorId}`);
  }
}
