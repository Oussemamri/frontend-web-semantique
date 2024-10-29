import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExpertService } from 'src/app/core/services/expert.service';

@Component({
  selector: 'app-expertlist',
  templateUrl: './expertlist.component.html',
  styleUrls: ['./expertlist.component.scss']
})
export class ExpertlistComponent implements OnInit {

  experts: any[] = [];
  selectedExpert: any = {}; 
  modalExpert: any; 
  modalRef?: BsModalRef;

  newExpert = {
    expertName: '',
    expertBio: '',
    expertContactInfo: ''
  };

  expertToUpdate = {
    expertId: '',
    expertName: '',
    expertBio: '',
    expertContactInfo: ''
  };

  @ViewChild('modalTemplate', { static: true }) modalTemplate!: TemplateRef<any>;
  @ViewChild('addExpertModal', { static: false }) addExpertModal!: TemplateRef<any>;

  constructor(private expertService: ExpertService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.loadExperts();
  }

  loadExperts(): void {
    this.expertService.getExperts().subscribe(
      (data: any) => {
        console.log('Experts data:', data);
        this.experts = data.results.bindings.map((binding: any) => ({
          expertId: binding.expert_id.value,
          expertName: binding.expert_name.value,
          expertBio: binding.expert_bio.value,
          expertContactInfo: binding.expert_contact_info.value,
        }));
      },
      error => {
        console.error('Error loading experts:', error);
      }
    );
  }

  // Génère un ID unique pour un nouvel expert
  private generateId(): string {
    return 'exp_' + Math.floor(Math.random() * 1000000).toString(); // Exemple d'ID aléatoire
  }

  addExpert(): void {
    const expertWithId = {
      ...this.newExpert,
      expertId: this.generateId() // ID généré automatiquement
    };
    this.expertService.addExpert(expertWithId).subscribe((response) => {
      console.log(response);
      this.loadExperts();
      this.closeModal();
      this.newExpert = { expertName: '', expertBio: '', expertContactInfo: '' };
    });
  }

  setExpertToUpdate(expert: any): void {
    console.log("Setting expert to update:", expert);
    this.expertToUpdate = { ...expert }; 
    this.modalRef = this.modalService.show(this.modalTemplate); 
  }

  updateExpert(): void {
    this.expertService.updateExpert(this.expertToUpdate.expertId, this.expertToUpdate).subscribe((response) => {
      console.log(response);
      this.loadExperts();
      this.closeModal();
    });
  }

  deleteExpert(expertId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this expert?');
    if (confirmDelete) {
      this.expertService.deleteExpert(expertId).subscribe((response) => {
        console.log(response);
        this.experts = this.experts.filter(expert => expert.expertId !== expertId);
      });
    }
  }

  openAddExpertModal(): void {
    this.modalRef = this.modalService.show(this.addExpertModal);
    this.newExpert = { expertName: '', expertBio: '', expertContactInfo: '' };
  }

  openModal(expert: any): void {
    this.modalExpert = expert;
    this.modalRef = this.modalService.show(this.modalTemplate);
  }

  closeModal(): void {
    this.selectedExpert = {};
    this.modalRef?.hide();
  }
}
