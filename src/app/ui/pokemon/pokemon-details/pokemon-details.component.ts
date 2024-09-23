import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { GetPokemonUseCase } from '../../../domain/usecases/get-pokemon.usecase';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PokemonGetModel } from '../../../domain/models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit {
  pokemonUseCase = inject(GetPokemonUseCase);
  router = inject(Router);
  @Input() pokemonName = '';

  pokemon = signal({
    id: -1,
    name: '',
    height: 0,
    order: 0,
    status:false,
    sprites: { front_default: '' },
    moves: [],
    types: [],
  } as PokemonGetModel);

  ngOnInit(): void {
    this.pokemonUseCase.execute({ name: this.pokemonName }).subscribe({
      next: (response) => {
        this.pokemon.set(response);
      },
    });
  }

  goToBack() {
    this.router.navigate(['/pokemon/list'], { replaceUrl: true }).then();
  }
}
