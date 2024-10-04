// src/app/services/serviceadmin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceadminService {
  private apiUrl = 'http://localhost:8085/admins'; // Backend API URL

  constructor(private http: HttpClient) {}

}
