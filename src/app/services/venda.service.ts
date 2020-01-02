import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private banco: AngularFirestore) { }

  private vendaCollection = 'vendas';

  getVendas(): Observable<firebase.firestore.QuerySnapshot> {
    return this.banco.collection<Venda>(this.vendaCollection, ref => ref.orderBy('dataVenda', 'desc')).get();
  }

  salvarVenda(venda : Venda) : Promise<DocumentReference> {
    return this.banco.collection(this.vendaCollection).add(venda)
  }

}
