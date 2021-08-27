import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: any
  heroes: Heroe[] = []
  heroeSeleccionado!: Heroe | undefined

  constructor(private heroesSerice: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(event: any) {
    const term = event.target.value
    if(term === '') {
      this.termino = undefined
      this.heroes = []
      return 
    }
    this.termino = term
    this.heroesSerice.getSugerencias(this.termino)
       .subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value
    if(!heroe) {
      this.heroeSeleccionado = undefined
      return
    }
    this.termino = heroe
    this.heroesSerice.getHeroeById(heroe.id!)
    .subscribe(heroe => {
      this.heroeSeleccionado = heroe
    })
  }

  get showEmpty() {
    return this.heroes.length === 0 && this.termino?.trim().length > 0 
  }
}
