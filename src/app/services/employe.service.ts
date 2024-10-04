// employe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8085/employes'; // URL de votre API

  constructor(private http: HttpClient) { }

  getEmployes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateEmploye(id: number, employe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employe);
  }
}
