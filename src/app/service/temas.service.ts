import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../model/tema';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  constructor(private http: HttpClient) { }

  token= {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>('https://bp2022.herokuapp.com/temas', this.token)
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('https://bp2022.herokuapp.com/temas', tema, this.token)
  }
}
