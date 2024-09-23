import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GetPokemonUseCase } from '../../../domain/usecases/get-pokemon.usecase';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let mockGetPokemonUseCase: jasmine.SpyObj<GetPokemonUseCase>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockGetPokemonUseCase = jasmine.createSpyObj('GetPokemonUseCase', [
      'execute',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    (mockRouter.navigate as jasmine.Spy).and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        PokemonDetailsComponent,
      ],
      providers: [
        { provide: GetPokemonUseCase, useValue: mockGetPokemonUseCase },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    component.pokemonName = 'pikachu';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemon details on init', () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      height: 4,
      order: 1,
      status: true,
      sprites: { front_default: 'pikachu.png' },
      moves: [],
      types: [],
    };

    mockGetPokemonUseCase.execute.and.returnValue(of(mockPokemon));
    fixture.detectChanges();

    expect(mockGetPokemonUseCase.execute).toHaveBeenCalledWith({
      name: 'pikachu',
    });
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should navigate back to pokemon list', () => {
    component.goToBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pokemon/list'], {
      replaceUrl: true,
    });
  });
});
