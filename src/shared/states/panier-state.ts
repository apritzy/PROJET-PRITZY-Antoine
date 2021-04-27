import { Injectable, setTestabilityGetter } from '@angular/core';
import { Action , State, StateContext,Selector } from '@ngxs/store';
import { AddReference,DelReference } from '../actions/panier.actions';
import { PanierStateModel } from './panier-state-model';

@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    panier : []
  } 
   
})
@Injectable()
export class PanierState {

    @Selector () 
    static getReferences (state:PanierStateModel) {
        return state.panier;
    }

    @Action (AddReference)
        add(
            {getState, patchState } :  StateContext<PanierStateModel>, 
            { payload }: AddReference) {
            const state = getState();
            patchState({panier : [...state.panier, payload]});
    }

    @Action (DelReference)
    del(
            {getState, patchState } :  StateContext<PanierStateModel>, 
            { payload }: DelReference) {
            const state = getState();
            let panierCopy = [...state.panier];
            console.log(payload);
            let indexRemove = panierCopy.indexOf(payload);
            console.log(indexRemove);
            console.log(panierCopy);
            panierCopy.splice(indexRemove, 1);
            patchState({panier : panierCopy});
    }

}