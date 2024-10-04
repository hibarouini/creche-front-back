import { Component } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  feedback = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private feedbackService: FeedbackService) {}

  onSubmit() {
    this.feedbackService.sendFeedback(this.feedback).subscribe(
      response => {
        console.log('Feedback sent successfully:', response);
        // Afficher un message de succès ou rediriger
      },
      error => {
        console.error('Error sending feedback:', error);
        // Afficher un message d'erreur
      }
    );
  }
}
