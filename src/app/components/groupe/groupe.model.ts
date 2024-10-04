export class Groupe {
    id: number;
    nom: string;
    nbEnfants: number;
    EmployeList: any[]; // Remplacer par un modèle Employe approprié si disponible
  
    constructor() {
      this.id = 0;
      this.nom = '';
      this.nbEnfants = 0;
      this.EmployeList = [];
    }
  }
  