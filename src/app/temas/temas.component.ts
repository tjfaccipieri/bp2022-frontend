import { TemasService } from './../service/temas.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/tema';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  constructor(
    private router: Router,
    private temaService: TemasService,
    private alerta: AlertasService
    ) { }


  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      alert('Você precisa estar logado para acessar essa tela')
      this.router.navigate(['/entrar'])
      this.alerta.info('','Você precisa estar logado para cadastrar um novo tema')
    }

    this.buscarTemas()
  }

  buscarTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      this.alerta.sucesso('Temos um tema','Tema cadastrado com sucesso')
      this.buscarTemas()
    })
  }

}
