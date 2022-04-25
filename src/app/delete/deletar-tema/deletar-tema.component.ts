import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from 'src/app/model/tema';
import { TemasService } from 'src/app/service/temas.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-deletar-tema',
  templateUrl: './deletar-tema.component.html',
  styleUrls: ['./deletar-tema.component.css']
})

export class DeletarTemaComponent implements OnInit {

  idTema: number
  tema: Tema = new Tema()

  constructor(
    private router: Router,
    private temaService: TemasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
      this.router.navigate(['/entrar']);
      alert('Você precisa estar logado para apagar o tema.')
    }

    this.idTema = this.route.snapshot.params['id']
    this.getTemaById()
  }

  getTemaById(){
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  deletarTema(){
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert('Tema apagado com sucesso')
      this.router.navigate(['/temas'])
    })
  }
}
