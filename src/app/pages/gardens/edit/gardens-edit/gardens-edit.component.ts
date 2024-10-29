import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GardenService } from 'src/app/core/services/garden_service/garden.service';

@Component({
  selector: 'app-gardens-edit',
  templateUrl: './gardens-edit.component.html',
  styleUrls: ['./gardens-edit.component.scss']
})
export class GardensEditComponent implements OnInit  {

  gardenForm: FormGroup;
  gardenId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private gardenService: GardenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gardenId = this.route.snapshot.paramMap.get('id');
    this.gardenForm = this.fb.group({
      garden_id: ['',Validators.required],
      garden_name: ['', Validators.required],
      garden_size: ['', Validators.required],
      garden_location: ['', Validators.required],
      garden_created_at: ['', Validators.required],
      plant_id: ['', Validators.required],
    });

    this.loadGardenData();
  }

  loadGardenData(): void {
    this.gardenService.getGardenById(this.gardenId).subscribe((data) => {
      this.gardenForm.patchValue(data);

      const gardenData = data.results.bindings[0]; // Get the first binding
  
      const mappedData = {
        garden_id: gardenData.garden.value.split('Garden')[1],  // Extract ID from URI
        garden_name: gardenData.garden_name.value,
        garden_size: gardenData.garden_size.value,
        garden_location: gardenData.garden_location.value,
        garden_created_at: gardenData.garden_created_at.value,
        plant_id: gardenData.plant.value.split('Plant')[1],  // Extract ID from URI
      };
  
      this.gardenForm.patchValue(mappedData);
    });
  }

  onSubmit(): void {
    if (this.gardenForm.valid) {
      this.gardenService.updateGarden(this.gardenForm.value).subscribe(() => {
        this.router.navigate(['/gardens']);
      });
    }
  }

}
