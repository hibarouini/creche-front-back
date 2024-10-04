import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Import du Router

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {
  reclamations: any[] = []; // Vous pouvez définir une interface pour les réclamations si souhaité
  editForm: FormGroup; // Formulaire pour éditer les réclamations
  selectedReclamation: any; // Réclamation sélectionnée pour l'édition
  showForm: boolean = false;

  constructor(
    private feedbackService: FeedbackService, 
    private fb: FormBuilder, 
    private router: Router // Injection du Router
  ) {
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.loadReclamations();
  }

  goBack(): void {
    this.router.navigate(['/admin']); // Redirige vers la page admin
  }

  loadReclamations(): void {
    this.feedbackService.getAllReclamations().subscribe(
      data => {
        this.reclamations = data;
      },
      error => {
        console.error('Error loading reclamations:', error);
      }
    );
  }

  deleteReclamation(id: number): void {
    if (confirm('Are you sure you want to delete this reclamation?')) {
      this.feedbackService.deleteReclamation(id).subscribe(() => {
        this.loadReclamations();
      });
    }
  }

  editReclamation(reclamation: any): void {
    this.selectedReclamation = reclamation;
    this.editForm.patchValue({
      name: reclamation.name,
      email: reclamation.email,
      message: reclamation.message
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedReclamation = {
        name: this.editForm.value.name,
        email: this.editForm.value.email,
        message: this.editForm.value.message
      };
      this.feedbackService.updateReclamation(this.selectedReclamation.id, updatedReclamation).subscribe(() => {
        this.loadReclamations();  // Recharge la liste des réclamations
        this.selectedReclamation = null;  // Réinitialise la réclamation sélectionnée
        this.editForm.reset();  // Réinitialise le formulaire
        
        // Affiche une alerte de succès
        Swal.fire({
          title: 'Succès!',
          text: 'La réclamation a été mise à jour avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
    }
  }
}
