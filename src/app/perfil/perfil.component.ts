import { Usuario } from './../model/usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  idUsuario: number = environment.id
  usuario: Usuario = new Usuario()
  confirmarSenha: string

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      this.router.navigate(['/entrar'])
      alert('Você precisa estar logado para acessar essa tela')
    }

    this.getUsuarioById()
  }

  getUsuarioById() {
    this.auth.getUsuarioById(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.usuario.senha = ''
    })
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  editarUsuario() {
    if (this.usuario.senha == this.confirmarSenha) {
      this.auth.editarUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        alert('Usuario Atualizado com sucesso, faça o login novamente.')
        this.router.navigate(['/entrar'])
        environment.id = 0
        environment.foto = ''
        environment.nome = ''
        environment.token = ''
        environment.usuario = ''
      })
    } else {
      alert('As senhas não coincidem')
    }
  }

}
