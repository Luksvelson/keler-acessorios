import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  // constructor(private banco: AngularFirestore) { }

  // private produtoCollection = 'produtos';

  // getProdutos(): Observable<firebase.firestore.QuerySnapshot> {
  //   return this.banco.collection<Produto>(this.produtoCollection, ref=> ref.orderBy('codigoProduto', 'asc')).get();
  // }

  // salvarProdutos(produto: Produto): Promise<DocumentReference> {
  //   return this.banco.collection(this.produtoCollection).add(produto)
  // }

  // editarProdutos(produto: Produto): Promise<void> {
  //   return this.banco.collection(this.produtoCollection).doc(produto.id).set(produto)
  // }

  // excluirProdutos(produto: Produto): Promise<void> {
  //   return this.banco.collection(this.produtoCollection).doc(produto.id).delete();
  // }

}
