import { Component, OnInit } from '@angular/core';
import { Bus } from '../../../../core/models/bus.models';
import { BusService } from 'src/app/core/services/bus.service';

@Component({
  selector: 'app-buses-list',
  templateUrl: './gardens-list.component.html',
  styleUrls: ['./gardens-list.component.scss']
})
export class GardensListComponent implements OnInit {

  buses: Bus[] = [];

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.getBuses();

  }

  getBuses(): void {
    this.busService.getBuses().subscribe(data => {
      this.buses = data.results.bindings.map(binding => ({
        bus_id: binding.id.value,
        bus_marque: binding.marque.value,
        bus_modele: binding.modele.value,
        bus_immatriculation: binding.immatriculation.value,
        bus_capacite: binding.capacite.value,
        horairesOuverture: binding.horairesOuverture.value,
        horairesFermeture: binding.horairesFermeture.value,
      }));
    });
  }

  deleteBus(bus_id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bus ?')) {
      this.busService.deleteBus(bus_id).subscribe(() => {
        this.getBuses();
      });
    }
  }
}
