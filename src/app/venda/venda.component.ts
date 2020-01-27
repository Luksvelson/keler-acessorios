import { Component, OnInit } from '@angular/core';
import { VendaService } from '../services/venda.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { Venda } from '../models/venda';

@Component({
  selector: 'venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private vendaService: VendaService,
  ) { }

  ngOnInit() {
  }

  addVenda() {
    const modal = this.modalService.open(VendaFormComponent);
    modal.componentInstance.contexto = "Adicionar Venda";
    modal.result.then(
      this.handleModalVendaForm.bind(this),
      this.handleModalVendaForm.bind(this)
      );
  }

  handleModalVendaForm(response) {
    this.mostrarVendas();
  }

  vendas : Venda[] = [];
    
  mostrarVendas() {
    this.vendaService.getVendas().subscribe(response => {
    this.vendas = [];
    response.docs.forEach(value => {
      const data = value.data();
      const venda : Venda = {
        id : value.id,
        codigoVenda: data.codigoVenda,
        pedidos: data.pedido,
        dataVenda: data.dataVenda,
        dataEntrega: data.dataEntrega
      };
      this.vendas.push(venda);
    });
  });
  }

}
