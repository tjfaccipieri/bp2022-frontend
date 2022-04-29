import { TemasService } from './../../service/temas.service';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/tema';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-editar-tema',
  templateUrl: './editar-tema.component.html',
  styleUrls: ['./editar-tema.component.css']
})
export class EditarTemaComponent implements OnInit {

  idTema: number
  tema: Tema = new Tema()

  constructor(
    private router: Router,
    private temaService: TemasService,
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
      this.router.navigate(['/entrar']);
      this.alerta.info('','Você precisa estar logado para editar o tema.')
    }

    this.idTema = this.route.snapshot.params['id']
    this.getTemaById()
  }

  getTemaById(){
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  editarTema(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      this.alerta.sucesso('','Tema editado com sucesso');
      this.router.navigate(['/temas'])
    })
  }

}
