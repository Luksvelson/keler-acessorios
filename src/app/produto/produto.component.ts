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
    modal.result.then(
      this.handleModalProdutoForm.bind(this),
      this.handleModalProdutoForm.bind(this)
      )
    }
    
    handleModalProdutoForm(response) {
      
    }
    
    produtos : Produto[] = [];
    
    mostrarProdutos() {
      this.produtoService.getProdutos().subscribe(response => {
      this.produtos = [];
      response.docs.forEach(value => {
        const data = value.data();
        const produto : Produto = {
          codigoProduto: data.codigoProduto,
          categoria: data.categoria,
          descricao: data.descricao
        };
        this.produtos.push(produto);
      });
    });
  }

  // editarProduto() {
  //   this.produtoService.editarProdutos()
  // }

  // deletarProduto() {

  // }

}
