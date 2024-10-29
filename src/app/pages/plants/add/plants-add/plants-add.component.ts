
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlantService } from 'src/app/core/services/plant_service/plant.service';

@Component({
  selector: 'app-plants-add',
  templateUrl: './plants-add.component.html',
  styleUrls: ['./plants-add.component.scss']
})
export class PlantsAddComponent implements OnInit  {

  plantForm: FormGroup;
  seasons: string[] = ['Spring', 'Summer', 'Autumn', 'Winter']; // List of seasons

  constructor(
    private fb: FormBuilder,
    private plantService: PlantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      
      plant_id: ['001', Validators.required],
      plant_garden_id: ['', Validators.required],
      plant_name: ['', Validators.required],
      harvest_time: ['', Validators.required],
      planting_season: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.plantForm.valid) {
      this.plantService.addPlant(this.plantForm.value).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    }
  }
}
