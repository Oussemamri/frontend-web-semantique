
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantService } from 'src/app/core/services/plant_service/plant.service';

@Component({
  selector: 'app-plants-edit',
  templateUrl: './plants-edit.component.html',
  styleUrls: ['./plants-edit.component.scss']
})
export class PlantsEditComponent implements OnInit  {

  plantForm: FormGroup;
  plantId: string;
  
  seasons: string[] = ['Spring', 'Summer', 'Autumn', 'Winter']; // List of seasons

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private plantService: PlantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.plantId = this.route.snapshot.paramMap.get('id');
    this.plantForm = this.fb.group({
      plant_id:['',Validators.required],
      plant_name: ['', Validators.required],
      plant_garden_id: ['', Validators.required],
      harvest_time: ['', Validators.required],
      planting_season: ['', Validators.required],
    });

    this.loadPlantData();
  }

  loadPlantData(): void {
    this.plantService.getPlantById(this.plantId).subscribe((data) => {
      const plantData = data.results.bindings[0]; // Get the first binding
  
      const mappedData = {
        plant_id: plantData.plant.value.split('Plant')[1],  // Extract ID from URI
        plant_name: plantData.plant_name.value,
        plant_garden_id: plantData.plant_garden_id.value,
        harvest_time: plantData.harvest_time.value,
        planting_season: plantData.planting_season.value,
      };
  
      this.plantForm.patchValue(mappedData);
      
    });
  }
  

  onSubmit(): void {
    if (this.plantForm.valid) {
      this.plantService.updatePlant(this.plantForm.value).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    }
  }
}
