import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
      img {
      width:100%;
      border-radius: 5px; 
    }`
  ]
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'MArvel - Comics'
    }
  ]
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance:'',
    publisher: Publisher.DCComics
  }
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar'))
      this.activatedRoute.params
      .pipe(switchMap(({id}) => this.heroesService.getHeroeById(id)))
      .subscribe(heroe => this.heroe = heroe)

  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) return;

    if(this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => {
        this.showSnackBar('Heroe actualizado correctamente')
        setTimeout(() => {
          this.router.navigate(['/heroes/lista'])
        },500)
      })
    }else {
      this.heroesService.crearHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes',heroe.id])
        this.showSnackBar('Heroe creado correctamente')
        setTimeout(() => {
          this.router.navigate(['/heroes/lista'])
        },500)
      })  
    }
  }

  eliminar() {
    const dialog = this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe(res =>  {
            this.showSnackBar('Heroe eliminado correctamente')
            this.router.navigate(['/heroes/lista'])
          })
        }
      }
    )
  }

  showSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'OK!'  ,
    {
      duration:2000
    })
  } 
}