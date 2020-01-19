import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule} from '@angular/forms';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { MenuComponent } from './menu/menu.component';
import { VendaComponent } from './venda/venda.component';


@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    ProdutoFormComponent,
    MenuComponent,
    VendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProdutoFormComponent]
})
export class AppModule { }
