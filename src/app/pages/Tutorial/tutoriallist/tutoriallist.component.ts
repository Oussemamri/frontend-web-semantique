import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TutorialService } from 'src/app/core/services/tutorial.service';

@Component({
  selector: 'app-tutoriallist',
  templateUrl: './tutoriallist.component.html',
  styleUrls: ['./tutoriallist.component.scss']
})
export class TutoriallistComponent implements OnInit {

  tutorials: any[] = [];
  experts: any[] = [];
  selectedTutorial: any = {};
  modalRef?: BsModalRef;

  newTutorial = {
    tutorialTitle: '',
    tutorialContent: '',
    authorId: ''
  };

  tutorialToUpdate = {
    tutorialId: '',
    tutorialTitle: '',
    tutorialContent: '',
    authorId: ''
  };

  @ViewChild('modalTemplate', { static: true }) modalTemplate!: TemplateRef<any>;
  @ViewChild('addTutorialModal', { static: false }) addTutorialModal!: TemplateRef<any>;

  constructor(private tutorialService: TutorialService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.loadTutorials();
    this.loadExperts();
  }

  loadTutorials(): void {
    this.tutorialService.getTutorials().subscribe(
      (data: any) => {
        console.log('Tutorials data:', data);
        this.tutorials = data.results.bindings.map((binding: any) => ({
          tutorialId: binding.tutorial_id?.value || '', // Vérification de la propriété `tutorial_id`
          tutorialTitle: binding.tutorial_title?.value || '', // Vérification de la propriété `tutorial_title`
          tutorialContent: binding.tutorial_content?.value || '', // Vérification de la propriété `tutorial_content`
          authorName: binding.expert_name?.value || '' // Vérification de la propriété `expert_name`
        }));
      },
      error => {
        console.error('Error loading tutorials:', error);
      }
    );
  }

  loadExperts(): void {
    this.tutorialService.getExperts().subscribe(
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

  // Génère un ID unique pour un nouveau tutoriel
  private generateId(): string {
    return 'tutorial_' + Math.floor(Math.random() * 1000000).toString(); // Exemple d'ID aléatoire
  }

  addTutorial(): void {
    const tutorialWithId = {
      ...this.newTutorial,
      tutorialId: this.generateId() // ID généré automatiquement
    };
    this.tutorialService.addTutorial(tutorialWithId).subscribe((response) => {
      console.log(response);
      this.loadTutorials();
      this.closeModal();
      this.newTutorial = { tutorialTitle: '', tutorialContent: '', authorId: '' };
    });
  }

  setTutorialToUpdate(tutorial: any): void {
    this.tutorialToUpdate = { ...tutorial };
    this.modalRef = this.modalService.show(this.modalTemplate);
  }

  updateTutorial(): void {
    this.tutorialService.updateTutorial(this.tutorialToUpdate).subscribe((response) => {
      console.log(response);
      this.loadTutorials();
      this.closeModal();
    });
  }

  deleteTutorial(tutorialId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this tutorial?');
    if (confirmDelete) {
      this.tutorialService.deleteTutorial(tutorialId).subscribe((response) => {
        console.log(response);
        this.tutorials = this.tutorials.filter(tutorial => tutorial.tutorialId !== tutorialId);
      });
    }
  }

  openAddTutorialModal(): void {
    this.modalRef = this.modalService.show(this.addTutorialModal);
    this.newTutorial = { tutorialTitle: '', tutorialContent: '', authorId: '' };
  }

  closeModal(): void {
    this.selectedTutorial = {};
    this.modalRef?.hide();
  }
}
