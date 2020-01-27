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
  }
  
  listaProdutosForm : FormGroup;
  produtosExistentes : Produto[] = [];
  pedidos : FormArray;
  listaPronta : any[] = [];

criarProduto(): FormGroup {
      return this.formBuilder.group({
      produtos: this.produtosExistentes,
      precoUnitario: '',
      quantidade: 0,
      precoTotal: 0.0
    })
  }
  
  adicionarProduto() : void {
    this.pedidos = this.listaProdutosForm.get('pedidos') as FormArray;
    this.pedidos.push(this.criarProduto());

  }

  gerarLista(lista : any) {
    this.listaPronta.push(lista);
  }
    
  @Output() listaProdutos = new EventEmitter;
  
  emitirListaProdutos() {
    this.listaProdutos.emit(this.listaPronta);
  }

}
