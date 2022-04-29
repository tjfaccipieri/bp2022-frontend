import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar() {
    if (this.confirmarSenha == this.usuario.senha) {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.alerta.sucesso('Seja bem vinde','Cadastro realizado com sucesso!');
        this.router.navigate(['/entrar'])
      })
    } else {
      this.alerta.erro('Algo deu errado','As senhas não coincidem')
    }
  }

}
