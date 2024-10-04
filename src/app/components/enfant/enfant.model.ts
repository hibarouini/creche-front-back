export class Enfant {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public dateNaissance: Date,
    public dateInscription: Date,
    public age: number,
    public genre: string,
    public groupe: string
  ) {}
}
