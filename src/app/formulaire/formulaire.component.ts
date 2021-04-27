import { Component, OnInit, Input } from '@angular/core';
import { FormulaireService } from '../service/formulaire.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {

  constructor(private formulaireService : FormulaireService) { }

  regEx1 = /[A-Za-z]{2,30}/;
  regEx2 = /[A-Za-z0-9]{2,30}/;

  @Input() erreur : boolean = true;
  
  login : string = "" ;
  password : string = "";
  alert : string ="";

  error : boolean = false;
  
  ngOnInit(): void {
  }

  inscription () {
    console.log ("inscription");
  }

  // inscription() {
  //   this.formulaireService.inscription(this.login, this.password).subscribe((flux) => {
  //     this.alert = "Inscription réussie."
  // }, (error) => {
  //     this.error = error.message;
  // });

}