import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  produtoForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private produtoService : ProdutoService
    ) { }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      codigoProduto: ['', Validators.required],
      categoria: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required]
    })
  }

  contexto : string;
  produtoSelecionado : Produto;

  salvarProduto() {
    if (this.contexto == "Adicionar Produto") {
      this.adicionarProduto();
    } else {
      this.alterarProduto();
    }
  }

  adicionarProduto() {
    if(this.produtoForm.invalid) {
      return;
    }
    
    let produto : Produto = this.produtoForm.value;
    this.produtoService.salvarProduto(produto).then(response => this.handleSuccessSave(response, produto))
    .catch(err => console.error(err));
  }

  alterarProduto() {
    if(this.produtoForm.invalid) {
      return;
    }
    
    let produto : Produto = this.produtoForm.value;
    produto.id = this.produtoSelecionado.id;
    this.produtoService.editarProduto(produto).then(response => this.handleSuccessEdit(produto))
    .catch(err => console.error(err));
  }

  handleSuccessSave(response: DocumentReference, produto: Produto) {
    this.activeModal.dismiss({produto: produto, id: response.id, CreateMode: true})
    
  }

  handleSuccessEdit(produto: Produto) {
    this.activeModal.dismiss({produto: produto, id: produto.id, CreateMode: true})
  }


}
