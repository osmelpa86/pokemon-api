import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { PokemonModel } from '../../../domain/models/pokemon.model';
import { GetPokemonsUseCase } from '../../../domain/usecases/get-pokemons.usecase';
import { Page } from '../../../core/base/page';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UrlToImagePipe } from '../../../core/commons/pipes/url-to-image.pipe';
import { LinkPipe } from '../../../core/commons/pipes/link.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    UrlToImagePipe,
    LinkPipe,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit {
  pokemonsUseCase = inject(GetPokemonsUseCase);
  columns: string[] = ['id', 'name', 'url', 'image', 'actions'];
  data: PokemonModel[] = [];
  dataSource = new MatTableDataSource<PokemonModel>();
  page: Page = {
    total: 100,
    pageSize: 5,
    index: 0,
  };

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    const offset = this.page.index * this.page.pageSize;
    this.pokemonsUseCase
      .execute({ offset: offset, limit: this.page.pageSize })
      .subscribe({
        next: (response) => {
          this.data = response;
          this.dataSource.data = this.data;
        },
        error: (err) => {
          console.error('Error loading pokemons:', err);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.page.index = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.loadPokemons();
  }
}
