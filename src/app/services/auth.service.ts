import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/auth'; // URL de base de l'API
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  userRole$ = this.userRoleSubject.asObservable();
  private currentUser: string | null = null;

  constructor(private http: HttpClient) {}

  inscrireUtilisateur(registerDto: any): Observable<any> {
    const registerUrl = `${this.baseUrl}/registre`;
    return this.http.post(registerUrl, registerDto);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.success === 'true') {
            const userRole = response.role;
            this.userRoleSubject.next(userRole);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('authenticatedUser', JSON.stringify(response));
            this.currentUser = email; // Stocker l'utilisateur connecté (si nécessaire)
          }
        })
      );
  }
}
