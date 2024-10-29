import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/core/models/garden/plant';
import { PlantService } from 'src/app/core/services/plant_service/plant.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements OnInit {

  plants: Plant[] = [];
  searchTerm: string = '';

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.getPlants();
  }
  getPlants(): void {
    this.plantService.getPlants().subscribe(data => {
      this.plants = data.results.bindings.map(binding => ({
        plant_id: binding.plant_id.value,
        plant_name: binding.plant_name.value,
        planting_season: binding.planting_season.value,
        harvest_time: binding.harvest_time.value,
      }));
    });
  }
  deletePlant(plant_id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet plante ?')) {
      this.plantService.deletePlant(plant_id).subscribe(() => {
        this.getPlants();
      });
    }
  }

}