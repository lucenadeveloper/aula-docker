import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http'; // Importar o provideHttpClient
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public nome: string = '';
  public idade: number | null = null;
  public pessoas: { nome: string, idade: number }[] = [];
  private subscriptions = new Subscription();

  constructor(
    private httpClient: HttpClient
  ){}

  public ngOnInit(): void {
    this.buscarPessoas();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public adicionarUsuario() {
    if (this.nome && this.idade) {
      this.salvarNovaPessoa();
      this.nome = ''; // Limpa o campo de nome
      this.idade = null; // Limpa o campo de idade
    }
  }

  public salvarNovaPessoa(): void {
    const pessoa = {
      nome: this.nome,
      idade: this.idade,
    };
    
    this.subscriptions.add(
      this.httpClient.post<any>('http://localhost:3000/pessoas', pessoa).subscribe(
        res => this.buscarPessoas(),
        err => console.error('Erro ao adicionar pessoa', err)
      )
    )
  }

  public buscarPessoas(): void {
    this.subscriptions.add(
      this.httpClient.get<any>('http://localhost:3000/pessoas').subscribe(
        res => this.pessoas = res.reverse(),
        err => console.error('Erro ao buscar pessoas', err)
      )
    )
  }
}
