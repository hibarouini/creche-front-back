import { Component, OnInit } from '@angular/core';
import { GroupeService } from 'src/app/services/groupe.service';;
import { Groupe } from './groupe.model';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  groupe: Groupe = new Groupe(); // Initialise un nouvel objet Groupe

  constructor(private groupeService: GroupeService) {}

  ngOnInit(): void {
    // Ici, vous pouvez récupérer un groupe existant par son ID si nécessaire
  }

  onSubmit(): void {
    this.groupeService.saveGroupe(this.groupe).subscribe(
      response => {
        console.log('Groupe enregistré avec succès:', response);
      },
      error => {
        console.error('Erreur lors de l\'enregistrement du groupe:', error);
      }
    );
  }
}
