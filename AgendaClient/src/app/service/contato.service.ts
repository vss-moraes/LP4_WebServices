import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable()
export class ContatoService {

  urlServicos = 'http://localhost:3000/contatos'

  constructor(private http: HttpClient) { }

  cadastrar(contato: any) {
    return this.http.post(this.urlServicos, contato)
  }

  listar(){
    return this.http.get<any[]>(this.urlServicos);
  }

  editar(contato: any){
    console.log(contato);
    return this.http.put(this.urlServicos + '/' + contato._id, contato);
  }

  remover(id: any) {
    return this.http.delete(this.urlServicos + '/' + id);
  }
}
