import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Expert } from 'src/app/core/models/expert';
import { ExpertService } from 'src/app/core/services/expert.service';

@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.scss']
})
export class AddExpertComponent {

  newExpert: Expert = { expert_id: 0, expert_name: '', expert_bio: '', expert_contact_info: '' };

  constructor(private expertService: ExpertService, private router: Router) {}

  addExpert(): void {
    this.expertService.addExpert(this.newExpert).subscribe(() => {
      // Rediriger vers la liste des experts après l'ajout
      this.router.navigate(['/expertlist']);
    });
  }

}
