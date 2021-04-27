import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { PanierState } from '../../../shared/states/panier-state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Reference } from '../../../shared/models/reference';
import { AddReference } from '../../../shared/actions/panier.actions';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ref : string = "";

  ngOnInit(): void {
    this.ref = this.route.snapshot.paramMap.get('id');
  }

}
