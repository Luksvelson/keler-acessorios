import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  constructor(
    private produtoService : ProdutoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.listaProdutosForm = this.formBuilder.group({
      pedidos: this.formBuilder.array([ this.criarProduto() ])
    })
    this.mostrarProdutos();
  }
  
  listaProdutosForm : FormGroup;
  produtosExistentes : Produto[] = [];
  pedidos : FormArray;
  produtosSelecionados: Produto[] = [];
  listaPronta: [string, number, number, number][] = [];

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

criarProduto(): FormGroup {
      return this.formBuilder.group({
      produtos: this.produtosExistentes,
      precoUnitario: '',
      quantidade: 0,
      precoTotal: 0.0
    })
  }

  selecionarProduto(produtoSelecionado: string) {
    console.log(this.produtosExistentes);
      for(let i = 0; i < this.produtosExistentes.length; i++) {
        if (this.produtosExistentes[i].descricao === produtoSelecionado) {
          this.produtosSelecionados.push(this.produtosExistentes[i]);
        }
      }
      console.log(this.produtosSelecionados)
      return this.produtosSelecionados;
  }
  
  
  definirPreco(quantidade: number) {
    if (this.produtosSelecionados && this.produtosSelecionados.length) {
      for(let i = 0; i < this.produtosSelecionados.length; i++) {
        this.listaPronta.push([this.produtosSelecionados[i].descricao, this.produtosSelecionados[i].preco,
          quantidade, this.produtosSelecionados[i].preco * quantidade]);
        }
        
        console.log(this.listaPronta);
      } 
    }
    
    adicionarProduto() : void {
      this.pedidos = this.listaProdutosForm.get('pedidos') as FormArray;
      this.pedidos.push(this.criarProduto());

    }
    
    @Output()listaProdutos = new EventEmitter;
    
    
    emitirProduto() {
    // ,

    // for(let i = 0; i < this.produtosSelecionados.length; i++) {
    //   listaPronta.push(this.produtosSelecionados[i].descricao, this.produtosSelecionados[i].preco, )
    // }

  }

}
