import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';


@Component({
  selector: 'card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent implements OnInit {

  constructor(
    private produtoService : ProdutoService
  ) { }
  
  ngOnInit() {
    this.mostrarProdutos();
  }

  produtosExistentes : Produto[] = [];
  produtoSelecionado = {
    descricao : null,
    precoUnitario : null,
    quantidade : 0,
    precoTotal : 0
  };

  @Output() produto = new EventEmitter;

  mostrarProdutos() {
    this.produtoService.getProdutos().subscribe(response => {
    this.produtosExistentes = [];
    response.docs.forEach(value => {
      const data = value.data();
      const produto : Produto = {
        id : value.id,
        codigoProduto: data.codigoProduto,
        categoria: data.categoria,
        descricao: data.descricao,
        preco: data.preco
      };
      this.produtosExistentes.push(produto);
    });
  });
}

selecionarProduto(produto: string) {
  for(let i = 0; i < this.produtosExistentes.length; i++) {
      if (this.produtosExistentes[i].descricao === produto) {
        this.produtoSelecionado.descricao = this.produtosExistentes[i].descricao;
        this.produtoSelecionado.precoUnitario = this.produtosExistentes[i].preco;
        this.definirPreco(0);
      }
    }
  return this.produtoSelecionado;
}

definirPreco(quantidade: number) {
  this.produtoSelecionado.quantidade = quantidade;
  this.produtoSelecionado.precoTotal = this.produtoSelecionado.quantidade * this.produtoSelecionado.precoUnitario;
  console.log(this.produtoSelecionado);
  if (quantidade > 0) {
    this.emitirProduto(this.produtoSelecionado);
  }
}

emitirProduto(produtoSelecionado: any) {
  this.produto.emit(produtoSelecionado);
}

}
