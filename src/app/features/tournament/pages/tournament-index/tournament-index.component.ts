import {Component, inject} from '@angular/core';
import {TournamentPagesDtoModel} from '../../models/tournament-pages-dto.model';
import {TournamentService} from '../../services/tournament.service';
import {TournamentShortDtoModel} from '../../models/tournament-short-dto.model';
import {TableModule} from 'primeng/table';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tournament-index',
  imports: [
    TableModule,
    Paginator,
    RouterLink
  ],
  templateUrl: './tournament-index.component.html',
  styleUrl: './tournament-index.component.scss'
})
export class TournamentIndexComponent{

  private readonly _tournamentService: TournamentService = inject(TournamentService);

  tournaments!: TournamentShortDtoModel[];
  pageable!: TournamentPagesDtoModel
  first: number = 0;
  rows: number = 10;
  totalElements!: number;



  constructor() {
    this._tournamentService.getAllTournaments().subscribe({
      next: tournaments => {
        this.tournaments = tournaments.content;
        this.pageable = tournaments
        this.totalElements = tournaments.totalElements
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.newPage(this.first,this.rows);
  }

  newPage(first: number, rows: number) {
    this._tournamentService.getPage(first/rows).subscribe({
      next: tournaments => {
        this.tournaments = tournaments.content;
        this.pageable = tournaments;
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
