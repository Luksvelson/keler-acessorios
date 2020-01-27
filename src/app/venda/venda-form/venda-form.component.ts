import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DocumentReference } from '@angular/fire/firestore';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { VendaComponent } from '../venda.component';

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
    });
  }

  contexto : string;
  venda : Venda;

  salvarVenda() {
    if (this.contexto == "Adicionar Venda") {
      this.adicionarVenda();
    } else {
      this.alterarVenda();
    }
  }

  adicionarPedidos(pedidos : any) {
    for (let i = 0; i < pedidos.length; i++) {
      this.venda.pedidos.push(pedidos[i]);
    }
    console.log(this.venda.pedidos);
  }

  adicionarVenda() {
    if(this.vendaForm.invalid) {
      return;
    }
    
    this.venda = this.vendaForm.value;
    this.vendaService.salvarVenda(this.venda).then(response => this.handleSuccessSave(response, this.venda))
    .catch(err => console.error(err));
  }

  alterarVenda() {

  }

  handleSuccessSave(response: DocumentReference, venda: Venda) {
    this.activeModal.dismiss({venda: venda, id: response.id, CreateMode: true})
    
  }

}
