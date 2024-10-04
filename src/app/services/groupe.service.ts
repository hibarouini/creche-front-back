import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groupe } from '../components/groupe/groupe.model';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private baseUrl = 'http://localhost:8085/groupes'; // URL de base pour les groupes

  constructor(private http: HttpClient) {}

  getGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${this.baseUrl}`);
  }

  saveGroupe(groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(`${this.baseUrl}/save`, groupe);
  }

  updateGroupe(id: number, groupe: Groupe): Observable<Groupe> {
    return this.http.put<Groupe>(`${this.baseUrl}/${id}`, groupe);
  }

  deleteGroupe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
