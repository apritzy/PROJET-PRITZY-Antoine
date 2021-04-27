import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../service/produit.service';
import {Observable,of,from} from 'rxjs';
import {filter} from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AddReference } from '../../../shared/actions/panier.actions';
import { Reference } from '../../../shared/models/reference';
import { PanierState } from 'src/shared/states/panier-state';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})

export class CatalogueComponent implements OnInit {

  constructor(private produitService : ProduitService, private store : Store) { }

  observableproduits$ : Observable<any> = null;

  subscribe : any;

  ngOnInit(): void {
    this.observableproduits$ = this.produitService.getCatalogue ();
  }

  addPanier (ref : string) {
    console.log (ref);
    this.store.dispatch (new AddReference ({"reference":ref}));
  }

}



