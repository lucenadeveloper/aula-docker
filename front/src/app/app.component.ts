import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome: string = '';
  idade: number | null = null;
  usuarios: { nome: string, idade: number }[] = [];

  public adicionarUsuario() {
    console.log('=== NOME ===', this.nome);
    console.log('=== IDADE ===', this.idade);
    if (this.nome && this.idade) {
      this.usuarios.push({ nome: this.nome, idade: this.idade });
      this.nome = ''; // Limpa o campo de nome
      this.idade = null; // Limpa o campo de idade
    }
  }

  public excluirUsuario(index: number) {
    this.usuarios.splice(index, 1); // Remove o usuário da lista pelo índice
  }
}
