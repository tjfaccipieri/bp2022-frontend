import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostagemService } from '../service/postagem.service';
import { TemasService } from '../service/temas.service';
import { Tema } from '../model/tema';
import { Postagem } from '../model/postagem';
import { Usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  listaTemas: Tema[]
  tema: Tema = new Tema()
  temaId: number
  descricaoTema: string

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPostagem: string

  usuarioId: number = environment.id
  usuario: Usuario = new Usuario()

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemasService,
    private auth: AuthService,
    private alerta: AlertasService
  ) { }


  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {

      this.router.navigate(['/entrar'])
      this.alerta.info('','Você precisa estar logado para acessar essa tela')
    }

    this.auth.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  getTemaById(){
    this.temaService.getTemaById(this.temaId).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  publicarPostagem(){
    this.tema.id = this.temaId
    this.postagem.tema = this.tema

    this.usuario.id = this.usuarioId
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      this.alerta.sucesso('Temos um texto','Postagem feita com sucesso')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  getUsuarioById(){
    this.auth.getUsuarioById(this.usuarioId).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  getPostagemByTitulo(){
    if(this.tituloPostagem == '') {
      this.getAllPostagens()
    } else {
      this.postagemService.getPostagemByTitulo(this.tituloPostagem).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  getTemaByDescricao(){
    if(this.descricaoTema == '') {
      this.getAllTemas()
    } else {
      this.temaService.getTemaByDescricao(this.descricaoTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

}
