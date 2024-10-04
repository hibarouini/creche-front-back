import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private feedbackUrl = 'http://localhost:8085/reclamations'; // Remplacez par l'URL de votre API

  // Déclaration des options HTTP
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  sendFeedback(feedback: { name: string; email: string; message: string }): Observable<any> {
    const reclamation = {
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
    };
    return this.http.post(this.feedbackUrl + '/msg', reclamation, this.httpOptions);
  }

  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.feedbackUrl);
  }

  deleteReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.feedbackUrl}/${id}`);
  }

  updateReclamation(id: number, reclamation: any): Observable<any> {
    return this.http.put(`${this.feedbackUrl}/${id}`, reclamation, this.httpOptions);
  }
}
