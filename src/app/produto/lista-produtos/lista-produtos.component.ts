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
      produto: ['', Validators.required],
      quantidade: ['', Validators.required],
      pedidos: this.formBuilder.array([ this.criarProduto() ])
    })
    this.mostrarProdutos();
  }

  listaProdutosForm : FormGroup;
  produtosExistentes : Produto[] = [];
  produtosSelecionados: Produto[] = [];
  pedidos : FormArray;

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
      produto: '',
      precoTotal: '',
      quantidade: 0,
    })
  }

  selecionarProduto(produtoSelecionado: string) {
    console.log(this.produtosExistentes);
      for(let i = 0; i <= this.produtosExistentes.length; i++) {
        if (this.produtosExistentes[i].descricao === produtoSelecionado) {
          this.produtosSelecionados.push(this.produtosExistentes[i]);
        }
      }
      return this.produtosSelecionados;
  }

  definirPreco() {
    if (this.produtosSelecionados && this.produtosSelecionados.length) {
      return this.produtosSelecionados[this.produtosSelecionados.length].preco;
    } else {
      return 0;
    }
  }

  adicionarProduto() : void {
    this.pedidos = this.listaProdutosForm.get('pedidos') as FormArray;
    this.pedidos.push(this.criarProduto());
  }

  @Output()listaProdutos = new EventEmitter;


  emitirProduto() {

  }

}
