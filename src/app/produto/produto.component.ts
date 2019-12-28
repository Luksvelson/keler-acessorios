import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@Component({
  selector: 'produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  addProduto() {
    const modal = this.modalService.open(ProdutoFormComponent);
    modal.result.then(
      this.handleModalProdutoForm.bind(this),
      this.handleModalProdutoForm.bind(this)
    )
    }

  handleModalProdutoForm(response) {
    alert('Janela Fechada');
  }
    

}
