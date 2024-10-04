import { Component, OnInit } from '@angular/core';
import { AuthserviceEnfantService } from 'src/app/services/authservice.enfant.service';
import Swal from 'sweetalert2';
import { Enfant } from './enfant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.css']
})
export class EnfantComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  enfants: Enfant[] = [];
  enfantModel = new Enfant(0, '', '', new Date(), new Date(), 0, '', '');
  selectedEnfant: Enfant | null = null;
  nombreEnfants: number = 0;
  nom: any;
  showForm: boolean = false; // Variable pour contrôler l'affichage du formulaire

  constructor(private authServiceEnfant: AuthserviceEnfantService, private router: Router) {} // Injection correcte de Router

  ngOnInit(): void {
    this.loadEnfants(); // Charge la liste et le nombre d'enfants lors de l'initialisation
  }

  loadEnfants(): void {
    this.authServiceEnfant.obtenirListeEnfants().subscribe(
      (data: Enfant[]) => {
        this.enfants = data;
      },
      error => {
        console.error('Erreur lors de la récupération de la liste des enfants : ', error);
      }
    );

    this.authServiceEnfant.compterEnfants().subscribe(
      (count: number) => {
        console.log('Nombre d\'enfants:', count);
        this.nombreEnfants = count;
      },
      error => {
        console.error('Erreur lors du comptage des enfants : ', error);
      }
    );
  }

 

  addNew(): void {
    this.showForm = !this.showForm; // Basculer la visibilité du formulaire
    if (this.showForm) {
      this.enfantModel = new Enfant(0, '', '', new Date(), new Date(), 0, '', ''); // Réinitialiser les champs pour un nouvel ajout
      this.selectedEnfant = null;
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']); // Redirige vers la page admin
  }

  selectEnfant(enfant: Enfant): void {
    this.selectedEnfant = enfant;
    this.enfantModel = { ...enfant };
    this.showForm = true; // Afficher le formulaire pour la modification
  }

  updateEnfant(): void {
    if (this.selectedEnfant) {
      this.authServiceEnfant.updateEnfant(this.selectedEnfant.id, this.enfantModel).subscribe(
        response => {
          this.loadEnfants(); // Re-fetch the list and count of children
          this.resetForm();
          Swal.fire({
            title: 'Bravo!',
            text: 'L\'enfant a été mis à jour avec succès!',
            icon: 'success'
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'enfant : ', error);
        }
      );
    }
  }

  deleteEnfant(id: number): void {
    if (id) {
      this.authServiceEnfant.deleteEnfant(id).subscribe(
        () => {
          this.loadEnfants(); // Re-fetch the list and count of children
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'enfant a été supprimé avec succès!',
            icon: 'success'
          });
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'enfant : ', error);
          Swal.fire({
            title: 'Erreur!',
            text: `Erreur lors de la suppression de l'enfant : ${error.message || 'Unknown error'}`,
            icon: 'error'
          });
        }
      );
    }
  }

  searchEnfant(): void {
    if (this.nom.trim() !== '') {
      this.authServiceEnfant.getEnfantByNom(this.nom).subscribe(
        (enfants: Enfant[]) => {
          this.enfants = enfants;
          if (enfants.length === 0) {
            Swal.fire({
              title: 'Aucun enfant trouvé',
              text: `Aucun enfant trouvé avec le nom : ${this.nom}`,
              icon: 'info'
            });
          }
        },
        error => {
          console.error('Erreur lors de la recherche : ', error);
          Swal.fire({
            title: 'Erreur',
            text: `Erreur lors de la recherche : ${error.message}`,
            icon: 'error'
          });
        }
      );
    }
  }

  resetForm(): void {
    this.enfantModel = new Enfant(0, '', '', new Date(), new Date(), 0, '', '');
    this.selectedEnfant = null;
    this.showForm = false; // Masquer le formulaire lorsque réinitialisé
  }
}
