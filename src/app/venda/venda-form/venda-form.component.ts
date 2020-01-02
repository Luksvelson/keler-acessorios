import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DocumentReference } from '@angular/fire/firestore';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private vendaService: VendaService,
    private produtoService: ProdutoService
  ) { }
  
  vendaForm : FormGroup;
  pedidos : FormArray;

  ngOnInit() {
    this.vendaForm = this.formBuilder.group({
      codigoVenda: ['', Validators.required],
      dataVenda: ['', Validators.required],
      dataEntrega: ['', Validators.required]
    })
    this.mostrarProdutos()
  }

  contexto : string;
  vendaSelecionado : Venda;

  produtos : Produto[] = [];

  mostrarProdutos() {
    this.produtoService.getProdutos().subscribe(response => {
    this.produtos = [];
    response.docs.forEach(value => {
      const data = value.data();
      const produto : Produto = {
        id : value.id,
        codigoProduto: data.codigoProduto,
        categoria: data.categoria,
        descricao: data.descricao,
        preco: data.preco
      };
      this.produtos.push(produto);
    });
  });
  }

  

  

  salvarVenda() {
    if (this.contexto == "Adicionar Venda") {
      this.adicionarVenda();
    } else {
      this.alterarVenda();
    }
  }

  adicionarVenda() {
    if(this.vendaForm.invalid) {
      return;
    }
    
    let venda : Venda = this.vendaForm.value;
    this.vendaService.salvarVenda(venda).then(response => this.handleSuccessSave(response, venda))
    .catch(err => console.error(err));
  }

  alterarVenda() {

  }

  handleSuccessSave(response: DocumentReference, venda: Venda) {
    this.activeModal.dismiss({venda: venda, id: response.id, CreateMode: true})
    
  }

}
