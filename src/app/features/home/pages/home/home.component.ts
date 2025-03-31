import {Component, inject} from '@angular/core';
import {TournamentShortDtoModel} from '../../../tournament/models/tournament-short-dto.model';
import {TournamentService} from '../../../tournament/services/tournament.service';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    TableModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly _tournamentService: TournamentService = inject(TournamentService);

  tournaments!: TournamentShortDtoModel[];

  constructor() {
    this._tournamentService.getRecentTournaments().subscribe({
      next: datas => {
        this.tournaments = datas;
      },
      error: err => {
        console.error(err);
      }
    });
  }


}
