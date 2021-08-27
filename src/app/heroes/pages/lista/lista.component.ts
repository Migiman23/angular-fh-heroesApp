import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {
  heroes!: Heroe[]
  constructor(private heoresService: HeroesService) { }

  ngOnInit(): void {
    this.heoresService.getHeroes()
    .subscribe(res => {
      this.heroes = res
    })
  }

}
