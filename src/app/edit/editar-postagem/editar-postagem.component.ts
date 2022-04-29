import { TemasService } from 'src/app/service/temas.service';
import { Tema } from 'src/app/model/tema';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from 'src/app/model/postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-editar-postagem',
  templateUrl: './editar-postagem.component.html',
  styleUrls: ['./editar-postagem.component.css']
})
export class EditarPostagemComponent implements OnInit {

  idPostagem: number
  postagem: Postagem = new Postagem()

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      this.router.navigate(['/entrar'])
      alert('Você precisa estar logado para acessar essa tela')
    }

    this.idPostagem = this.route.snapshot.params['id']
    this.getPostagemById()
    this.getAllTemas()
  }

  getPostagemById() {
    this.postagemService.getPostagemById(this.idPostagem).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  getTemaById(){
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  editarPostagem(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert('Postagem editada com sucesso')
      this.router.navigate(['/inicio'])
    })
  }

}
