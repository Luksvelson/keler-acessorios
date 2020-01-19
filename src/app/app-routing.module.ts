import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { VendaComponent } from './venda/venda.component';


const routes: Routes = [
  {path: '', component: VendaComponent},
  {path: 'produtos', component: ProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
