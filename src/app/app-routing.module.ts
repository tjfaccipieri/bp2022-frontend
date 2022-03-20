import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemasComponent } from './temas/temas.component';
import { EditarTemaComponent } from './edit/editar-tema/editar-tema.component';
import { DeletarTemaComponent } from './delete/deletar-tema/deletar-tema.component';
import { EditarPostagemComponent } from './edit/editar-postagem/editar-postagem.component';
import { DeletarPostagemComponent } from './delete/deletar-postagem/deletar-postagem.component';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', pathMatch: 'full'},
  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'temas', component: TemasComponent},
  {path: 'editarTema/:id', component: EditarTemaComponent},
  {path: 'apagarTema/:id', component: DeletarTemaComponent},
  {path: 'editarPostagem/:id', component: EditarPostagemComponent},
  {path: 'apagarPostagem/:id', component: DeletarPostagemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
