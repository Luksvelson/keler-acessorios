import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private produtoService: ProdutoService,
  ) { }

  ngOnInit() {
    this.mostrarProdutos();
  }
  
  addProduto() {
    const modal = this.modalService.open(ProdutoFormComponent);
    modal.componentInstance.contexto = "Adicionar Produto";
    modal.result.then(
      this.handleModalProdutoForm.bind(this),
      this.handleModalProdutoForm.bind(this)
      );
  }
    
  handleModalProdutoForm(response) {
    this.mostrarProdutos();
  }
    
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

  editarProduto(index : number) {
    const modal = this.modalService.open(ProdutoFormComponent);
    modal.componentInstance.contexto = "Editar Produto";
    modal.componentInstance.produtoSelecionado = this.produtos[index];
    console.log(this.produtos[index]);
    modal.result.then(
      this.handleModalProdutoForm.bind(this),
      this.handleModalProdutoForm.bind(this)
      )
  }

  deletarProduto(index : number) {

    this.produtoService.excluirProdutos(this.produtos[index]).then(() => { this.produtos.splice(index, 1); })
    .catch(err => console.error(err));
  }

}
