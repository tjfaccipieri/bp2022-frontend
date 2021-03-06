import { Postagem } from './../../model/postagem';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PostagemService } from 'src/app/service/postagem.service';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-deletar-postagem',
  templateUrl: './deletar-postagem.component.html',
  styleUrls: ['./deletar-postagem.component.css']
})
export class DeletarPostagemComponent implements OnInit {

  idPostagem: number
  postagem: Postagem = new Postagem()

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      this.router.navigate(['/entrar'])
      this.alerta.info('','Você precisa estar logado para acessar essa tela')
    }

    this.idPostagem = this.route.snapshot.params['id']
    this.getPostagemById()
  }

  getPostagemById() {
    this.postagemService.getPostagemById(this.idPostagem).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  apagarPostagem() {
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      this.router.navigate(['/inicio'])
      this.alerta.info('Processo concluido','Postagem apagada com sucesso')
    })
  }

}
