import { Component, OnInit } from '@angular/core';
import { AuthserviceEnfantService } from 'src/app/services/authservice.enfant.service';
import { FeedbackService } from 'src/app/services/feedback.service'; // Import du service

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  totalEnfants: number = 0;
  numberOfReclamations: number = 0;

  constructor(
    private authoserviceenfantservice: AuthserviceEnfantService,
    private feedbackService: FeedbackService // Injection du FeedbackService
  ) {}

  ngOnInit(): void {
    this.getTotalEnfants();
    this.getReclamationsCount();
  }

  getReclamationsCount(): void {
    this.feedbackService.getAllReclamations().subscribe(
      (data: any[]) => { // Type explicite pour les données reçues
        this.numberOfReclamations = data.length; // Calcul du nombre de réclamations
      },
      (error: any) => { // Type explicite pour l'erreur
        console.error('Error loading reclamations:', error);
      }
    );
  }

  getTotalEnfants(): void {
    this.authoserviceenfantservice.compterEnfants().subscribe((total: number) => {
      this.totalEnfants = total;
    });
  }
}
