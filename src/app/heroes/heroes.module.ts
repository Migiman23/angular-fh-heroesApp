import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { HeroeCardComponent } from './components/heroe-card/heroe-card.component';
import { ImgURLPipe } from './pipes/img-url.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HeroesComponent,
    HomeComponent,
    ListaComponent,
    HeroeCardComponent,
    ImgURLPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    HeroesRoutingModule,
    MaterialModule,
  ]
})
export class HeroesModule { }
