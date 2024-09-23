import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { UrlToImagePipe } from '../../../core/commons/pipes/url-to-image.pipe';
import { LinkPipe } from '../../../core/commons/pipes/link.pipe';
import { GetPokemonsUseCase } from '../../../domain/usecases/get-pokemons.usecase';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockGetPokemonsUseCase: jasmine.SpyObj<GetPokemonsUseCase>;

  beforeEach(async () => {
    mockGetPokemonsUseCase = jasmine.createSpyObj('GetPokemonsUseCase', [
      'execute',
    ]);

    await TestBed.configureTestingModule({
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
        PokemonListComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: GetPokemonsUseCase, useValue: mockGetPokemonsUseCase },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on init', () => {
    const mockPokemons = [
      {
        id: 1,
        name: 'Bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
        image: 'bulbasaur.png',
      },
      {
        id: 2,
        name: 'Ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
        image: 'ivysaur.png',
      },
    ];

    mockGetPokemonsUseCase.execute.and.returnValue(of(mockPokemons));
    fixture.detectChanges();

    expect(mockGetPokemonsUseCase.execute).toHaveBeenCalledWith({
      offset: 0,
      limit: 5,
    });
    expect(component.data).toEqual(mockPokemons);
    expect(component.dataSource.data).toEqual(mockPokemons);
  });

  it('should handle errors while loading pokemons', () => {
    const error = new Error('Test error');
    mockGetPokemonsUseCase.execute.and.returnValue(throwError(() => error));
    spyOn(console, 'error');

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith(
      'Error loading pokemons:',
      error
    );
  });

  it('should update page and reload pokemons on page change', () => {
    const mockPokemons = [
      {
        id: 3,
        name: 'Venusaur',
        url: 'https://pokeapi.co/api/v2/pokemon/3/',
        image: 'venusaur.png',
      },
    ];

    mockGetPokemonsUseCase.execute.and.returnValue(of(mockPokemons));
    component.onPageChange({ pageIndex: 1, pageSize: 5 } as PageEvent);

    expect(component.page.index).toBe(1);
    expect(component.page.pageSize).toBe(5);
    expect(mockGetPokemonsUseCase.execute).toHaveBeenCalledWith({
      offset: 5,
      limit: 5,
    });
    expect(component.data).toEqual(mockPokemons);
    expect(component.dataSource.data).toEqual(mockPokemons);
  });
});
