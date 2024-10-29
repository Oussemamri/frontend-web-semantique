import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gardens-add',
  templateUrl: './gardens-add.component.html',
  styleUrls: ['./gardens-add.component.scss']
})
export class GardensAddComponent implements OnInit {
  busForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.busForm = this.fb.group({
      id: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      immatriculation: ['', Validators.required],
      capacite: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      horairesOuverture: ['', Validators.required],
      horairesFermeture: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.busForm.valid) {
      this.http.post('http://localhost:9000/buses', this.busForm.value).subscribe({
        next: () => {
          this.router.navigate(['/gardens']);
        },
        error: (error) => {
          console.error('Failed to add bus:', error);
          alert('Error adding bus. Please check the details and try again.');
        }
      });
    }
  }
}
