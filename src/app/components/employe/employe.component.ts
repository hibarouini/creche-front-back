// employe.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  employes: any[] = [];

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.employeService.getEmployes().subscribe(
      data => {
        this.employes = data;
        console.log('Employés reçus :', this.employes); // Pour vérifier les données reçues
      },
      error => {
        console.error('Erreur lors de la récupération des employés :', error);
      }
    );
  }
}
