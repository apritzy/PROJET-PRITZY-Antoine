import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {Reference} from '../../../shared/models/reference';
import { DelReference} from '../../../shared/actions/panier.actions';
import {PanierState} from '../../../shared/states/panier-state';



@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  reference$ : Observable<Reference[]>;
  references: Reference[];

  ref : string;

  constructor(private store : Store) { }

  ngOnInit(): void {
    this.reference$ = this.store.select(PanierState.getReferences);
    console.log(this.reference$);
    console.log(this.references);
    this.reference$.subscribe(item => this.references = item);
  }

  onReferenceRemoved(reference:Reference){
   this.store.dispatch(new DelReference(reference));
  }

  payer (){
   console.log ("payé");
  }

  //erreur api "undefined" pour afficher le titre et le prix du produit dans le panier
  


}
