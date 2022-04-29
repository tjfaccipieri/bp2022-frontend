import { AlertasService } from './../service/alertas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/usuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  logar() {
    this.auth.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;

        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;
        environment.id = this.usuarioLogin.id;
        environment.token = this.usuarioLogin.token;
        environment.usuario = this.usuarioLogin.usuario
        this.alerta.sucesso('', 'Usuário logado com sucesso')
        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if (erro.status == 401) {
          this.alerta.erro('Usuário ou senha inválidos', 'Verifique os campos, e caso necessário, crie um cadastro')
        }
      }
    })
  }

}
