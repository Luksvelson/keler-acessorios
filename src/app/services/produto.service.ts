import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private banco: AngularFirestore) { }

  private produtoCollection = 'produtos';

  getProdutos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.banco.collection<Produto>(this.produtoCollection, ref=> ref.orderBy('codigoProduto', 'asc')).get();
  }

  salvarProduto(produto: Produto): Promise<DocumentReference> {
    return this.banco.collection(this.produtoCollection).add(produto)
  }

  editarProduto(produto: Produto): Promise<void> {
    return this.banco.collection(this.produtoCollection).doc(produto.id).set(produto)
  }

  excluirProdutos(produto: Produto): Promise<void> {
    return this.banco.collection(this.produtoCollection).doc(produto.id).delete();
  }

}
