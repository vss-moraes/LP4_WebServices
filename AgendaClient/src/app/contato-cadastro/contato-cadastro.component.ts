import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContatoService } from '../service/contato.service';
import { ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'app-contato-cadastro',
  templateUrl: './contato-cadastro.component.html',
  styleUrls: ['./contato-cadastro.component.css']
})
export class ContatoCadastroComponent implements OnInit {

  titulo = 'Contatos';
  contatos = [];
  display: boolean = false;
  favoritos: boolean = false;

  constructor(
    private service: ContatoService,
    private confirmationService: ConfirmationService  
  ) { }

  ngOnInit() {
    this.carregar();
  }

  cadastrar(formulario: FormControl){
    this.service.cadastrar(formulario.value).subscribe(() => {
      formulario.reset();
      this.carregar();
    });
  }

  carregar(){
    this.service.listar().subscribe((dados) => {
      if (this.favoritos) {
        this.contatos = dados.filter(function(elem) {
          if (elem.favorito){
            return elem
          }
        })
      } else {
        this.contatos = dados;
      }
    })
  }

  mostrarDialog(contato :any, formulario: FormControl){
    this.display = true;
    formulario.setValue(contato);
  }

  mostraFavoritos(){
    this.favoritos = !this.favoritos;
    this.carregar();
  }

  editar (formulario: FormControl) {
    this.service.editar(formulario.value).subscribe(() => {
      this.display = false;
      this.carregar();
    })
  }

  remover(contato) {
    this.confirmationService.confirm({
      message: 'Deseja realmente remover o contato "' + contato.nome + '"?',
      header: 'Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        this.service.remover(contato._id).subscribe(() => {
          this.carregar();
        });
      },
      reject: () => { }
    });
  }

  setaFavorito(contato: any){
    contato.favorito = contato.favorito ? false : true;
    console.log(contato);
    this.service.editar(contato).subscribe(() => {
      this.carregar();
    })
  }
}
