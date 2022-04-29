import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemasComponent } from './temas/temas.component';
import { EditarTemaComponent } from './edit/editar-tema/editar-tema.component';
import { DeletarTemaComponent } from './delete/deletar-tema/deletar-tema.component';
import { EditarPostagemComponent } from './edit/editar-postagem/editar-postagem.component';
import { DeletarPostagemComponent } from './delete/deletar-postagem/deletar-postagem.component';
import { PerfilComponent } from './perfil/perfil.component';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    InicioComponent,
    TemasComponent,
    EditarTemaComponent,
    DeletarTemaComponent,
    EditarPostagemComponent,
    DeletarPostagemComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
